import db from '../database/connection.js';
import bcrypt from 'bcrypt';

//-----------------------------------------------------
//-----------CONTROLLER Users--------------------------
//-----------------------------------------------------

const UserController = {

    //-----------------------------------------------------
    //-----------LISTAR Users------------------------------
    //-----------------------------------------------------

    ViewUsers: async (req, res) => {

        try {

            const [rows] = await db.query(
                'SELECT * FROM users'
            );

            res.json(rows);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                erro: 'Erro no banco de dados'
            });

        }

    },

    //-----------------------------------------------------
    //-----------ADD User----------------------------------
    //-----------------------------------------------------

    AddUser: async (req, res) => {

        try {

            const {
                nome,
                email,
                senha,
                usuario,
                img_url,
                cargo,
                status
            } = req.body;

            // Criptografa a senha
            const senhaHash = await bcrypt.hash(senha, 10);

            const sql = `
            INSERT INTO users (
                nome,
                email,
                senha,
                usuario,
                img_url,
                cargo,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

            await db.query(sql, [
                nome,
                email,
                senhaHash, // salva hash
                usuario,
                img_url,
                cargo,
                status
            ]);

            res.status(201).json({
                success: true,
                message: 'Usuário cadastrado com sucesso'
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                error: 'Erro ao cadastrar usuário'
            });

        }

    },

    //-----------------------------------------------------
    //-----------BUSCAR User-------------------------------
    //-----------------------------------------------------

    BuscarUser: async (req, res) => {

        try {

            const { id } = req.params;

            const [rows] = await db.query(
                'SELECT * FROM users WHERE id = ?',
                [id]
            );

            if (rows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });

            }

            res.status(200).json(rows[0]);

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message: 'Erro ao buscar usuário'
            });

        }

    },

    //-----------------------------------------------------
    //-----------DELETAR User------------------------------
    //-----------------------------------------------------

    DeletarUser: async (req, res) => {

        try {

            const { id } = req.params;

            const [result] = await db.query(
                'DELETE FROM users WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });

            }

            res.status(200).json({
                success: true,
                message: 'Usuário removido com sucesso'
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });

        }

    },

    //-----------------------------------------------------
    //-----------UPDATE User-------------------------------
    //-----------------------------------------------------



    AtualizarUser: async (req, res) => {

        try {

            const { id } = req.params;

            const {
                nome,
                email,
                senha,
                usuario,
                img_url,
                cargo,
                status
            } = req.body;

            // Busca senha atual
            const [userRows] = await db.query(
                'SELECT senha FROM users WHERE id = ?',
                [id]
            );

            if (userRows.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado'
                });

            }

            let senhaFinal = userRows[0].senha;

            // Só criptografa se nova senha for enviada
            if (senha && senha.trim() !== "") {

                senhaFinal = await bcrypt.hash(senha, 10);

            }

            const [result] = await db.query(
                `
            UPDATE users
            SET
                nome = ?,
                email = ?,
                senha = ?,
                usuario = ?,
                img_url = ?,
                cargo = ?,
                status = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
                [
                    nome,
                    email,
                    senhaFinal,
                    usuario,
                    img_url,
                    cargo,
                    status,
                    id
                ]
            );

            res.status(200).json({
                success: true,
                message: 'Usuário atualizado com sucesso'
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor'
            });

        }

    }
};

export default UserController;