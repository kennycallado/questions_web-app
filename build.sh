#!/bin/bash

platforms=("linux/amd64" "linux/arm64" "linux/arm/v7" "linux/arm/v6")
package_name=$(jq -r '.name' package.json)
package_version=$(jq -r '.version' package.json)

# Build the project
echo "Building the project..."
npm install
npm run build

# Sync capacitor
echo "Syncing capacitor..."
npx cap add android
npx cap sync

# Build the android app
echo "Building the android app..."
# npx cap open android

# Build the ios app
echo "Building the ios app..."
# npx cap open ios

# Build the docker image
echo "Building the docker images..."

for platform in ${platforms[@]}; do
  echo "Building docker image for: $platform."

  tag=$(echo "${platform//\//_}" | tr -d 'linux_' | xargs -I {} echo {})

  docker buildx build --no-cache --pull \
    --platform $platform \
    -t kennycallado/$package_name:${package_version}-${tag} \
    -f ./Containerfile .
done

# Push the docker images
echo "Pushing the docker images..."
docker push -a kennycallado/${package_name}

# Create the manifest
echo "Creating the manifest for the version: $package_version"
docker manifest create kennycallado/${package_name}:${package_version} \
  kennycallado/${package_name}:${package_version}-amd64 \
  kennycallado/${package_name}:${package_version}-arm64 \
  kennycallado/${package_name}:${package_version}-armv7 \
  kennycallado/${package_name}:${package_version}-armv6

# manifest for latest version
echo "Creating the manifest for latest version..."
docker manifest create kennycallado/${package_name}:latest \
  --amend kennycallado/${package_name}:${package_version}-amd64 \
  --amend kennycallado/${package_name}:${package_version}-arm64 \
  --amend kennycallado/${package_name}:${package_version}-armv7 \
  --amend kennycallado/${package_name}:${package_version}-armv6


# push the manifests
echo "Pushing the manifests..."
docker manifest push --purge kennycallado/${package_name}:${package_version}
docker manifest push --purge kennycallado/${package_name}:latest

# remove the images
echo "Removing the images..."
docker rmi kennycallado/${package_name}:${package_version}-amd64
docker rmi kennycallado/${package_name}:${package_version}-arm64
docker rmi kennycallado/${package_name}:${package_version}-armv7
docker rmi kennycallado/${package_name}:${package_version}-armv6

# remove the manifest
echo "Cleaning up the manifest..."
docker system prune -f
