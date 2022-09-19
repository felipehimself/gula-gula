import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';
const JWT_SECRET = process.env.JWT_SECRET;

export default async function middleware(req: NextRequest) {
  const jwt = req.cookies.get('GulaGulaJwt');

  // VERIFICA SE O USUÁRIO ESTÁ LOGADO E É VÁLIDO, SE POSITIVO, REDIRECIONA PARA CONTA, SE NÃO, VAI PARA AS PÁGINAS LOGIN OU SIGNUP
  if (
    req.nextUrl.pathname.startsWith('/auth/login') ||
    req.nextUrl.pathname.startsWith('/auth/signup')
  ) {
    if (jwt === undefined) {
      // se o usuário tentar acessar a rota sem JWT, segue para login
      return NextResponse.next();
    } else {
      // se não, verifica o jwt
      try {
        await jose.jwtVerify(jwt, new TextEncoder().encode(JWT_SECRET));
        return NextResponse.redirect(new URL('/', req.url));
      } catch (error) {
        // se levantar exceção (jwt inválido), direcionará para login ou signup, a url que está sendo chamada
        return NextResponse.next();
      }
    }
  }


  if (req.nextUrl.pathname.startsWith('/account')) {
    if (jwt === undefined) {      
      return NextResponse.redirect(new URL('/auth/login', req.url));
    } else {
      try {
        await jose.jwtVerify(jwt, new TextEncoder().encode(JWT_SECRET));
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
      }
    }
  }
}
