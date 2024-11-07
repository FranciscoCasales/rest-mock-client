#!/bin/bash
#v1.0.0

printHelp() {
  echo
  echo "HELP for 'publish.sh'"
  echo
  echo "Usage: ./publish.sh"
  echo
  echo "Build and push docker image"
  echo
  echo "Script takes a version."
  echo "Script creates the docker image using the name found in DockerImageName and steps found in Dockerfile."
  echo
  echo "Note: DockerImageName file is required to be in the same directory and contains the name of the docker image."
  echo
}

createDockerIgnoreFile() {
  echo ".git"                       > .dockerignore
  echo "bin"                       >> .dockerignore
}

OPTSTRING=":v:"
while getopts ${OPTSTRING} opt; do
  case ${opt} in
    v)
      version=${OPTARG}
      ;;
    ?)
      printHelp
      exit 1
      ;;
  esac
done

image=$(<DockerImageName)
if [ -z "$image" ]
then
  echo
  echo "Cannot find an image name in the required file 'DockerImageName'."
  printHelp
  exit 1
fi

if [ -z $version ]
then
  echo "version is required to publish the image"
  exit 1
fi

npm run build
createDockerIgnoreFile

echo "Creating image $image:$version..."
docker build -f Dockerfile -t $image:$version .

echo "Tagin remote image"
docker tag $image:$version casales/$image:$version
rm -rf dist

echo "Pushing new version $version"
docker push casales/rest-client-mock:$version
