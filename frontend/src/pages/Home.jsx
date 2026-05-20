// src/pages/Home.jsx

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

import "./Home.scss";

function Home() {

    // EXEMPLO DE DADOS
    // depois você pode buscar da API

    const produtosCategoria = [
        { categoria: "Eletrônicos", quantidade: 12 },
        { categoria: "Roupas", quantidade: 8 },
        { categoria: "Jogos", quantidade: 15 },
        { categoria: "Livros", quantidade: 5 },
    ];

    const estoque = [
        { nome: "Mouse", estoque: 20 },
        { nome: "Teclado", estoque: 14 },
        { nome: "Monitor", estoque: 7 },
        { nome: "Notebook", estoque: 4 },
    ];

    const vendas = [
        { mes: "Jan", vendas: 4000 },
        { mes: "Fev", vendas: 3200 },
        { mes: "Mar", vendas: 5400 },
        { mes: "Abr", vendas: 6100 },
        { mes: "Mai", vendas: 7200 },
    ];

    const COLORS = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444"
    ];

    return (
        <main id="home-dashboard">

            <h1>Dashboard</h1>

            <section className="cards">

                <div className="card">
                    <h2>Total Produtos</h2>
                    <span>40</span>
                </div>

                <div className="card">
                    <h2>Baixo Estoque</h2>
                    <span>6</span>
                </div>

                <div className="card">
                    <h2>Valor Estoque</h2>
                    <span>R$ 52.000</span>
                </div>

            </section>

            <section className="graficos">

                <div className="grafico-box">
                    <h2>Produtos por Categoria</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={produtosCategoria}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="categoria" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="quantidade"
                                fill="#3b82f6"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grafico-box">
                    <h2>Distribuição de Produtos</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>

                            <Pie
                                data={produtosCategoria}
                                dataKey="quantidade"
                                nameKey="categoria"
                                outerRadius={100}
                                label
                            >
                                {produtosCategoria.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            COLORS[index % COLORS.length]
                                        }
                                    />
                                ))}
                            </Pie>

                            <Tooltip />

                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="grafico-box full">
                    <h2>Evolução de Vendas</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={vendas}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" />
                            <YAxis />
                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="vendas"
                                stroke="#10b981"
                                strokeWidth={3}
                            />

                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="grafico-box full">
                    <h2>Estoque Atual</h2>

                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={estoque}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nome" />
                            <YAxis />
                            <Tooltip />

                            <Bar
                                dataKey="estoque"
                                fill="#f59e0b"
                            />

                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </section>

        </main>
    );
}

export default Home;