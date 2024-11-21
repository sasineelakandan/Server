import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../midlewere/jwt/authentiCateToken";

export function expressCallback(controller: any) {
  return async function (req:CustomRequest, res: Response, next: NextFunction) {
    const httpRequest = {
      user: req.user || null,
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
      },
    };

    try {
      const httpResponse = await controller(httpRequest);

      if (httpResponse.headers) {
        res.set(httpResponse.headers);
      }
     
    
      if (httpResponse.body.accessToken) {
        res.cookie("accessToken", httpResponse.body.accessToken, {
          httpOnly: false,
        });
      }

      if (httpResponse.body.refreshToken) {
        res.cookie("refreshToken", httpResponse.body.refreshToken, {
          httpOnly: true,
        });
      }

      res.type("json");
      res.status(httpResponse.statusCode).send(httpResponse.body);
    } catch (e: any) {
      next();
    }
  };
}