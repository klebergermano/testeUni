import db from '../database/connection.js';

const listarProdutos = async (req, res) => {

    try {

        const [rows] = await db.query(
            'SELECT * FROM produtos'
        );

        console.log(rows)
        res.json(rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            erro: 'Erro no banco de dados'
        });
    }

}


const criarProduto = (req, res) => {

    const produto = req.body;

    res.json({
        mensagem: 'Produto criado',
        produto
    });

};

const buscarProduto = (req, res) => {

    const id = req.params.id;



};

const deletarProduto = (req, res) => {

    const id = req.params.id;
    console.log('Deletar produto' + id)

};


export { listarProdutos, buscarProduto, criarProduto, deletarProduto }