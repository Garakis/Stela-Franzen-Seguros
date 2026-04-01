import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, mensagem, produtos } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'emmanogarakis@gmail.com',
      subject: `Nova Cotação Recebida - ${nome}`,
      text: `
Nova cotação recebida através do site:

Nome Completo: ${nome}
Email: ${email}
Produtos de Interesse: ${produtos}

Detalhes Opcionais / Mensagem:
${mensagem || 'Nenhum detalhe informado'}
      `,
      html: `
<h3>Nova cotação recebida através do site</h3>
<ul>
  <li><strong>Nome Completo:</strong> ${nome}</li>
  <li><strong>Email:</strong> ${email}</li>
  <li><strong>Produtos de Interesse:</strong> ${produtos}</li>
</ul>
<p><strong>Detalhes Opcionais / Mensagem:</strong><br/>${mensagem || '<i>Nenhum detalhe informado</i>'}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Erro ao enviar o email' }, { status: 500 });
  }
}
