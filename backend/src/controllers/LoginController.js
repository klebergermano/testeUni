import db from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//-----------------------------------------------------
//-----------CONTROLLER LOGIN--------------------------
//-----------------------------------------------------

const LoginController = {

    //-----------------------------------------------------
    //-----------LOGIN-------------------------------------
    //-----------------------------------------------------

    Login: async (req, res) => {

        try {

            const {
                email,
                senha
            } = req.body;

            // Validação básica
            if (!email || !senha) {

                return res.status(400).json({
                    success: false,
                    message: "Email e senha são obrigatórios"
                });

            }

            // Busca usuário
            const [rows] = await db.query(
                `
                SELECT
                    id,
                    nome,
                    email,
                    senha,
                    usuario,
                    img_url,
                    cargo,
                    status
                FROM users
                WHERE email = ?
                `,
                [email]
            );

            // Usuário não encontrado
            if (rows.length === 0) {

                return res.status(401).json({
                    success: false,
                    message: "Email ou senha inválidos"
                });

            }

            const user = rows[0];

            // Verifica status
            if (user.status !== "ativo") {

                return res.status(403).json({
                    success: false,
                    message: "Usuário inativo"
                });

            }

            // Compara senha
            const senhaCorreta = await bcrypt.compare(
                senha,
                user.senha
            );

            if (!senhaCorreta) {

                return res.status(401).json({
                    success: false,
                    message: "Email ou senha inválidos"
                });

            }

            // Gera token JWT
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    cargo: user.cargo
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "8h"
                }
            );

            // Remove senha da resposta
            delete user.senha;

            res.status(200).json({
                success: true,
                message: "Login realizado com sucesso",
                token,
                user
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message: "Erro interno do servidor"
            });

        }

    }

};

export default LoginController;