function buildSessionTokenPayload(usuario) {
  return {
    id: usuario.id,
    username: usuario.username,
    rol: usuario.rol,
    sessionVersion: usuario.sessionVersion
  };
}

function isSessionVersionValid(payload, usuario) {
  return (
    Number.isInteger(payload?.sessionVersion) &&
    Number.isInteger(usuario?.sessionVersion) &&
    payload.sessionVersion === usuario.sessionVersion
  );
}

function shouldRevokeSessions(currentUser, data = {}) {
  const roleChanged =
    Object.prototype.hasOwnProperty.call(data, "rol") &&
    data.rol !== currentUser.rol;

  const statusChanged =
    Object.prototype.hasOwnProperty.call(data, "estado") &&
    data.estado !== currentUser.estado;

  return roleChanged || statusChanged;
}

function buildSessionRevocationPatch(currentUser, data = {}) {
  if (!shouldRevokeSessions(currentUser, data)) {
    return {};
  }

  return {
    sessionVersion: {
      increment: 1
    }
  };
}

export {
  buildSessionRevocationPatch,
  buildSessionTokenPayload,
  isSessionVersionValid,
  shouldRevokeSessions
};
