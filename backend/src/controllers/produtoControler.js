import db from '../database/connection.js';

export const listarProdutos = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM produtos'
        );


        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: 'Erro no banco de dados'
        });
    }

}

//-----------------------------------------------------
//-----------Adiciona Produto-------------------------
//----------------------------------------------------
export const AddProduto = async (req, res) => {


    try {

        const {
            nome,
            descricao,
            categoria,
            marca,
            volume_ml,
            teor_alcoolico,
            preco_custo,
            preco_venda,
            quantidade_estoque,
            codigo_barras,
            imagem,
            ativo
        } = req.body;

        const sql = `
            INSERT INTO produtos (
                nome,
                descricao,
                categoria,
                marca,
                volume_ml,
                teor_alcoolico,
                preco_custo,
                preco_venda,
                quantidade_estoque,
                codigo_barras,
                imagem,
                ativo
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await db.query(sql, [
            nome,
            descricao,
            categoria,
            marca,
            volume_ml,
            teor_alcoolico,
            preco_custo,
            preco_venda,
            quantidade_estoque,
            codigo_barras,
            imagem,
            ativo
        ]);

        res.json({
            success: true,
            message: 'Produto cadastrado com sucesso'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: 'Erro ao cadastrar produto'
        });
    }







};

//-----------------------------------------------------
//-----------Busca Produto-------------------------
//----------------------------------------------------

export const buscarProduto = (req, res) => {

    const id = req.params.id;



};

//-----------------------------------------------------
//-----------DELETAR Produto-------------------------
//----------------------------------------------------
export const DeletarProduto = async (req, res) => {



    try {

        const { id } = req.params;

        const [result] = await db.query(
            'DELETE FROM produtos WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: 'Produto não encontrado'
            });

        }

        res.status(200).json({
            success: true,
            message: 'Produto removido com sucesso'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });

    }












};


