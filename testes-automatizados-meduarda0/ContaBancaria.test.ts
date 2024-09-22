import { beforeEach, describe, expect, test } from "bun:test";
import ContaBancaria from "./ContaBancaria.ts";

// Antes de cada teste vamos criar as contas  utilizando o beforEach

describe("Teste da Classe Conta Bancária", () => { //antes de tudo (cada teste), cria duas contas
    let conta: ContaBancaria
    let contaDois: ContaBancaria
    beforeEach(() => {
        conta = new ContaBancaria()
        contaDois = new ContaBancaria()
    }) 

    test("Método Depositar", () => {
        expect(conta.depositar(100)).toBe(100)
        //expectativa é que deposite 100 e fique 100 na conta
    })

    test("Método Depositar - Inválido", () => {
        expect(() => conta.depositar(-100)).toThrow("Valor inválido!"); // toThrow vai pegar o erro que ja foi lançado
        //expectativa é que tente depositar -100, mas dê inválido (pois foi feita a verificação)
    })

    // coloca o parentese com espaço so quando coloca toThrow
    test("Método Sacar - Depositar", () => {
        conta.depositar(10)
        expect(conta.sacar(5)).toBe(5);
        //expectativa é que saque 5 e fique 5 na conta (foi depositado 10)
    })

    test("Método Saque- Inválido ", () => {
        expect(() => conta.sacar(-1)).toThrow("Valor inválido");
        //expectativa é que tente sacar -1 e dê inválido (pois foi feita a verificação)
    })

    test("Método Transferir", () => {
        conta.depositar(400); //conta com 400 reais
        expect(conta.transferir(150, contaDois)).toBe(250);
        //espectativa é que tranfira 150 pra segunda conta e fique 250 na minha
    })

    test("Método Transferir - Inválido", () => {
        expect(() => conta.transferir(500, contaDois)).toThrow("Valor inválido");
        //expectativa que dê inválido, pois não foi depositado nada na conta
    })

    test("Método Consultar Saldo", () => {
        conta.depositar(10);
        expect(conta.consultarSaldo()).toBe(10);
        //expectativa que, ao consultar o saldo, tenha o que foi depositado (10)
    })

    test("Método Exibir Extrato", () => {
        conta.depositar(5000);
        conta.sacar(2500);
        expect(conta.exibirExtrato()).toBe("1. Depósito de R$ 5000.00-22/9/2024\n2. Saque de R$ 2500.00-22/9/2024");
        //expectativa que exiba o depósito e o saque no extrato da conta
    })
}) 