"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Draggable, Map, Marker, ZoomControl } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import Image from "next/image";

export default function MyMap({
  setCoords,
  coords,
}: {
  setCoords: Dispatch<SetStateAction<[number, number]>>;
  coords: [number, number];
}) {
  return (
    <Map
      provider={osm}
      height={300}
      center={coords}
      defaultCenter={coords}
      defaultZoom={16}
    >
      <ZoomControl />
      <Draggable anchor={coords} onDragEnd={setCoords}>
        <Image
          src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
          width={25}
          height={25}
          alt="m"
        />
      </Draggable>
    </Map>
  );
}
