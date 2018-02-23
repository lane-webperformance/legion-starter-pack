#!/usr/bin/env bash

export DISPLAY="${DISPLAY:-:99}"
Xvfb :99 &

exec "$@"
