/**
 * Utility to detect device capability synchronously at app start.
 * Returns 'low', 'mid', or 'high'.
 */

// Known weak GPU patterns (mostly mobile/integrated)
const WEAK_GPUS = [
  'mali',
  'adreno',
  'powervr',
  'intel hd',
  'intel uhd',
  'apple a', // older Apple chips
];

let cachedTier = null;

export function getDeviceTier() {
  if (cachedTier) return cachedTier;

  // 1. Check for URL override (e.g. ?tier=low)
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const urlTier = params.get('tier');
    if (urlTier === 'low' || urlTier === 'mid' || urlTier === 'high') {
      cachedTier = urlTier;
      return urlTier;
    }
  }

  // 2. Check prefers-reduced-motion
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      cachedTier = 'low';
      return 'low';
    }
  }

  let score = 0; // Higher is better

  // 3. Hardware Concurrency (cores)
  const cores = navigator.hardwareConcurrency || 4; // Default to 4 if unknown
  if (cores <= 4) {
    score -= 2;
  } else if (cores >= 8) {
    score += 2;
  }

  // 4. Device Memory (GB) - Chrome only
  const memory = navigator.deviceMemory;
  if (memory) {
    if (memory <= 4) {
      score -= 2;
    } else if (memory >= 8) {
      score += 2;
    }
  }

  // 5. Data Saver
  if (navigator.connection && navigator.connection.saveData) {
    score -= 3; // Strong indicator for low tier
  }
  
  // 6. Network type (if available)
  if (navigator.connection && navigator.connection.effectiveType) {
      if (navigator.connection.effectiveType === '3g' || navigator.connection.effectiveType === '2g') {
          score -= 2;
      }
  }

  // 7. WebGL Probe
  if (typeof window !== 'undefined') {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      
      if (!gl) {
        // No WebGL support at all -> definitely low
        cachedTier = 'low';
        return 'low';
      }

      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
        
        // Check if renderer matches known weak GPUs
        const isWeakGPU = WEAK_GPUS.some(gpu => renderer.includes(gpu));
        if (isWeakGPU) {
          score -= 3;
        } else {
          score += 1;
        }
      }
    } catch (e) {
      // If canvas creation or WebGL context throws -> low
      cachedTier = 'low';
      return 'low';
    }
  }

  // Calculate final tier based on score
  if (score <= -2) {
    cachedTier = 'low';
  } else if (score < 3) {
    cachedTier = 'mid';
  } else {
    cachedTier = 'high';
  }

  return cachedTier;
}
