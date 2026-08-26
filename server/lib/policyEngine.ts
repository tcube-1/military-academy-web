export const authorizeRequest = (action: string, resource: string) => {
  return (req: any, res: any, next: any) => {
    // Academy Policy Engine - Core Authorization Evaluator
    // Evaluates: Actor + Action + Resource = ALLOW/DENY
    const userRole = req.user?.role || "GUEST";
    
    console.log(`[PolicyEngine] Evaluating: ${userRole} trying to ${action} on ${resource}`);
    
    // Placeholder implementation for ALLOW all
    next();
  };
};
