import { PUBLIC_ORIGIN } from '$env/static/public';
import { fail, redirect } from '@sveltejs/kit'
import { lucia } from '$lib/server/auth/auth';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async (e) => {
    console.log('Signout action called');
    if (!e.locals.session) {
      console.log('No session found');
      return fail(401)
    }
    await lucia.invalidateSession(e.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    e.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes,
    });
    redirect(302, `${PUBLIC_ORIGIN}/`);
  },
};