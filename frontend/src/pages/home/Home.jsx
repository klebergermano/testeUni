// src/pages/Home.jsx

import { useEffect, useState } from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from "recharts";

import { API_URL } from "../../services/api";

import "./Home.scss";

function Home() {

    const [dashboard, setDashboard] = useState({
        totalProdutos: 0,
        baixoEstoque: 0,
        valorEstoque: 0,
        produtosCategoria: [],
        estoque: [],
        produtosRecentes: []
    });

    useEffect(() => {
        buscarProdutos();
    }, []);

    async function buscarProdutos() {

        try {

            const response = await fetch(`${API_URL}/produtos/view`);
            const data = await response.json();

            // apenas produtos ativos
            const produtosAtivos = data.filter(
                (produto) => produto.ativo === 1
            );

            // TOTAL PRODUTOS
            const totalProdutos = produtosAtivos.length;

            // BAIXO ESTOQUE (< 10)
            const baixoEstoque = produtosAtivos.filter(
                (produto) => produto.quantidade_estoque < 10
            ).length;

            // VALOR TOTAL ESTOQUE
            const valorEstoque = produtosAtivos.reduce(
                (total, produto) =>
                    total +
                    (
                        Number(produto.preco_custo) *
                        Number(produto.quantidade_estoque)
                    ),
                0
            );

            // PRODUTOS POR CATEGORIA
            const categoriasMap = {};

            produtosAtivos.forEach((produto) => {

                const categoria = produto.categoria || "Outro";

                if (!categoriasMap[categoria]) {
                    categoriasMap[categoria] = 0;
                }

                categoriasMap[categoria]++;

            });

            const produtosCategoria = Object.entries(categoriasMap).map(
                ([categoria, quantidade]) => ({
                    categoria,
                    quantidade
                })
            );

            // ESTOQUE ATUAL (TOP 10)
            const estoque = produtosAtivos
                .sort(
                    (a, b) =>
                        b.quantidade_estoque -
                        a.quantidade_estoque
                )
                .slice(0, 10)
                .map((produto) => ({
                    nome: produto.nome,
                    estoque: produto.quantidade_estoque
                }));

            // PRODUTOS RECENTES
            const produtosRecentes = produtosAtivos
                .sort(
                    (a, b) =>
                        new Date(b.created_at) -
                        new Date(a.created_at)
                )
                .slice(0, 6);

            setDashboard({
                totalProdutos,
                baixoEstoque,
                valorEstoque,
                produtosCategoria,
                estoque,
                produtosRecentes
            });

        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    }

    const COLORS = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#06b6d4",
        "#84cc16"
    ];

    function formatarMoeda(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    return (
        <main id="home-dashboard">

            <h1>Dashboard</h1>

            <section className="cards">

                <div className="card">
                    <h2>Total Produtos</h2>
                    <span>
                        {dashboard.totalProdutos}
                    </span>
                </div>

                <div className="card">
                    <h2>Baixo Estoque</h2>
                    <span>
                        {dashboard.baixoEstoque}
                    </span>
                </div>

                <div className="card">
                    <h2>Valor Estoque</h2>
                    <span>
                        {formatarMoeda(
                            dashboard.valorEstoque
                        )}
                    </span>
                </div>

            </section>

            <section className="graficos">

                <div className="grafico-box">
                    <h2>Produtos por Categoria</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={dashboard.produtosCategoria}
                        >
                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="categoria" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="quantidade"
                                fill="#3b82f6"
                                radius={[8, 8, 0, 0]}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grafico-box">
                    <h2>Distribuição de Produtos</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>

                            <Pie
                                data={dashboard.produtosCategoria}
                                dataKey="quantidade"
                                nameKey="categoria"
                                outerRadius={100}
                                label
                            >

                                {dashboard.produtosCategoria.map(
                                    (entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                            }
                                        />
                                    )
                                )}

                            </Pie>

                            <Tooltip />

                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="grafico-box full">
                    <h2>Maiores Estoques</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={dashboard.estoque}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="nome" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="estoque"
                                fill="#f59e0b"
                                radius={[8, 8, 0, 0]}
                            />

                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </section>

            <section className="ultimos-produtos">

                <div className="grafico-box full">

                    <h2>Últimos Produtos Cadastrados</h2>

                    <table>

                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Marca</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                            </tr>
                        </thead>

                        <tbody>

                            {dashboard.produtosRecentes.map(
                                (produto) => (
                                    <tr key={produto.id}>
                                        <td>
                                            {produto.nome}
                                        </td>

                                        <td>
                                            {produto.categoria}
                                        </td>

                                        <td>
                                            {produto.marca}
                                        </td>

                                        <td>
                                            {formatarMoeda(
                                                produto.preco_venda
                                            )}
                                        </td>

                                        <td>
                                            {
                                                produto.quantidade_estoque
                                            }
                                        </td>
                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </section>

        </main>
    );
}

export default Home;