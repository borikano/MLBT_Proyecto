function getHealth(req, res) {
  res.status(200).json({
    ok: true,
    service: "api-mlbt",
    project: "MLBT Project - Maria La Bonita Taqueria",
    evidence: "GA7-220501096-AA5-EV03",
    status: "running",
    timestamp: new Date().toISOString()
  });
}

export { getHealth };
