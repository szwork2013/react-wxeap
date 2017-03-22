import React from 'react';
import dva from 'dva';
import { Router, Route } from 'dva/router';
import { locationChangeMiddleware } from './middleware';
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
import * as CONSTANTS from './constants';

export default class MobileApp {

    constructor(routes, options) {
        this.mobileApp = dva({
            onAction: [locationChangeMiddleware],
            history: useRouterHistory(createHashHistory)({ queryKey: false }),//移除_k参数 
        });
        this.addModel(routes);
        this.addRouter(routes);
        this.configureAPI(options);
    }

    start() {
        if (CONSTANTS.DEV_MODE && this.auth && this.auth.length > 0) {
            fetch(this.origin + this.auth, { credentials: 'include' }).then(() => {
                this.mobileApp.start('#root');
            });
        } else {
            this.mobileApp.start('#root');
        }
    }

    addModel(routes) {
        for (let route of routes) {
            const { model } = route;
            this.mobileApp.model(model);
        }
    }

    addRouter(routes) {
        this.mobileApp.router(({ history }) => {
            return (
                <Router history={history}>
                    {routes.map(route => <Route key={route.path} path={route.path} component={route.component} />)}
                </Router>
            );
        })
    }

    configureAPI(options) {
        const { module, origin, auth } = options;
        this.origin = origin;
        this.auth = auth;

        const APIConfig = (origin, module) => {
            let url = window.location.href.toLowerCase();
            let end = url.indexOf(`/${module}`);
            url = url.substring(0, end);
            return CONSTANTS.DEV_MODE ? `${origin}/api/` : `${url}/api/`;
        }

        global.API = APIConfig(origin, module);
    }
}