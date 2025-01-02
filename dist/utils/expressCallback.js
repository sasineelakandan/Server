"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressCallback = expressCallback;
function expressCallback(controller) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const httpResponse = yield controller(httpRequest);
                if (httpResponse.headers.body === 'logout') {
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                }
                if (httpResponse.headers) {
                    res.set(httpResponse.headers);
                }
                if (httpResponse.body.accessToken) {
                    res.cookie("accessToken", httpResponse.body.accessToken, {
                        httpOnly: false,
                        secure: true,
                        sameSite: "strict",
                        domain: ".docreserva.site",
                    });
                }
                if (httpResponse.body.refreshToken) {
                    res.cookie("refreshToken", httpResponse.body.refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        domain: ".docreserva.site",
                    });
                }
                res.type("json");
                res.status(httpResponse.statusCode).send(httpResponse.body);
            }
            catch (e) {
                next();
            }
        });
    };
}
