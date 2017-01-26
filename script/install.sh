#!/bin/bash

###
# environment install script for Alpine Linux on Docker
###
runInstall() {
    local DIVIDER="===================="
    local TEMPLATE="\n\n${DIVIDER}${DIVIDER}${DIVIDER}\n%s\n\n\n"

    ###
    # NOTE: install Node.js LTS build dependencies
    ###
    printf "${TEMPLATE}" "Installing Node.js LTS build dependencies"
    setupDependencies

    ###
    # NOTE: setup project
    ###
    printf "${TEMPLATE}" "Installing Node Dependencies"
    setupProject

    ###
    # NOTE: add additional file/folder removal here for all images
    ###
    printf "${TEMPLATE}" "Removing Alpine Linux Package Cache, /tmp, and Node.js dependencies"
    clearInstallCache
}

setupDependencies() {
    apk add \
        binutils-gold \
        coreutils \
        curl \
        g++ \
        gcc \
        gnupg \
        grep \
        libgcc \
        libstdc++ \
        libuv-dev \
        linux-headers \
        make \
        openssl-dev \
        paxctl \
        python \
        tar \
        tree \
        zlib-dev
}

setupProject() {
    cd ${SOURCE}

    if [[ ${NODE_ENV} == "production" ]]
    then
        npm install --quiet --production
        npm run bundle
    else
        apk add tar
        npm install --quiet -g webpack
        npm install --quiet
    fi
}

clearInstallCache() {
    if [[ ${NODE_ENV} == "production" ]]
    then
        apk del \
            binutils-gold \
            curl \
            g++ \
            gcc \
            gnupg \
            libgcc \
            libstdc++ \
            libuv-dev \
            linux-headers \
            make \
            openssl-dev \
            paxctl \
            python \
            tar \
            zlib-dev
    fi

    rm -rf \
        ${NODE_PATH}/include \
        ${NODE_PATH}/lib/node_modules/npm/doc \
        ${NODE_PATH}/lib/node_modules/npm/html \
        ${NODE_PATH}/lib/node_modules/npm/man \
        ${NODE_PATH}/share/man \
        /etc/ssl \
        /root/.gnupg \
        /root/.node-gyp \
        /root/.npm \
        /tmp/* \
        /var/cache/apk/*
}

runInstall
