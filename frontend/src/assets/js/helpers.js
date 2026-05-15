
const helpers = {
    formatarDecimalBR(valor) {

        valor = parseFloat(valor)
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    gerarSlug(texto) {
        return texto
            .toLowerCase()
            .replaceAll(' ', '-');
    },


    formatarMoedaBR(valor) {

        // remove tudo que não for número
        valor = valor.replace(/\D/g, "");

        // evita erro vazio
        if (!valor) return "";

        // transforma em decimal
        valor = (Number(valor) / 100).toFixed(2);

        // troca . por ,
        return valor.replace(".", ",");
    },

    moedaBRParaFloat(valor) {

        if (!valor) return 0;

        return parseFloat(
            valor.replace(",", ".")
        );
    }


};

export default helpers;
