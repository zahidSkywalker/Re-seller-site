export interface User { id: string; name: string; email: string; phone: string; role: "buyer" | "seller" | "admin"; avatar?: string; isVerified: boolean; createdAt: Date; updatedAt: Date; }
