import React, { createContext, useContext, useState } from 'react';
import { getDeviceTier } from '../utils/deviceTier';

export const DeviceTierContext = createContext('high');

export function useDeviceTier() {
  return useContext(DeviceTierContext);
}

