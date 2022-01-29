import { testRoute } from './testRoute';
import { signUpRoute } from './signUpRoute';
import { logInRoute } from './logInRoute';
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';
import { updateUserInfoRoute } from './updateUserInfoRoute';
import {testEmailRoute} from './testEmailRoute';
import {verifyEmailRoute} from './verifyEmailRoute';
import {forgotPasswordRoute} from './forgotPasswordRoute';
import {resetPasswordRoute} from './resetPasswordRoute';

export const routes = [
    testRoute,
    signUpRoute,
    logInRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
    updateUserInfoRoute,
    testEmailRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute
];

