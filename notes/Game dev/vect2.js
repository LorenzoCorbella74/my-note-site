const vec2 = (() => {
  
  function create(x, y) {
    return [x, y]
  }
  
  function set(out, x, y) {
    out[0] = x
    out[1] = y
    return out
  }
  
  function polar(out, angle, length = 1) {
    return set(out, Math.cos(angle) * length, Math.sin(angle) * length)
  }
  
  function copy(out, [x, y]) {
    return set(out, x, y)
  }
  
  function clone([x, y]) {
    return create(x, y)
  }
  
  function reset(out) {
    return set(out, 0, 0)
  }
  
  function lengthOf([x, y]) {
    return Math.hypot(x, y)
  }
  
  function directionOf([x, y]) {
    return Math.atan2(y, x)
  }

  function isInWithRadius([x, y], [sx, sy], [ex, ey], radius) {
    const r = radius * 0.5
    const l = Math.hypot(ex - sx, ey - sy)
    const w = [ex - sx, ey - sy]
    const vw = dot(w, w)
    const p = [x - sx, y - sy]
    const vp = dot(w, p)
    const vpl = vp / l
    const vwl = vw / l
    return vpl >= -r && vpl <= vwl + r
  }
  
  // NOTA: Esto no tiene en cuenta el tamaño real, por ese
  // motivo en la función de arriba obtenemos el tamaño de
  // la pared y dividimos los productos escalares por el
  // tamaño, de esta forma obtenemos la posición real
  // proyectada en la pared.
  function isIn([x, y], [sx, sy], [ex, ey]) {
    const w = [ex - sx, ey - sy]
    const vw = dot(w, w)
    const p = [x - sx, y - sy]
    const vp = dot(w, p)
    return vp >= 0 && vp <= vw
  }
  
  function sideOf([x, y], [sx, sy], [ex, ey]) {
    const lx = ex - sx, ly = ey - sy
    const d = ((x - sx) * ly - (y - sy) * lx) / Math.hypot(lx, ly)
    return d
  }
  
  function add(out, [ax, ay], [bx, by]) {
    return set(out, ax + bx, ay + by)
  }
  
  function subtract(out, [ax, ay], [bx, by]) {
    return set(out, ax - bx, ay - by)
  }
  
  function multiply(out, [ax, ay], [bx, by]) {
    return set(out, ax * bx, ay * by)
  }
  
  function scale(out, [x, y], scale) {
    return set(out, x * scale, y * scale)
  }
  
  function divide(out, [ax, ay], [bx, by]) {
    return set(out, ax / bx, ay / by)
  }
  
  function dot([ax, ay], [bx, by]) {
    return ax * bx + ay * by
  }
  
  function cross([ax, ay], [bx, by]) {
    return ax * by - ay * bx
  }
  
  return {
    create,
    set,
    polar,
    copy,
    clone,
    reset,
    lengthOf,
    directionOf,
    isIn,
    isInWithRadius,
    sideOf,
    add,
    subtract,
    multiply,
    scale,
    divide,
    dot,
    cross
  }
})()