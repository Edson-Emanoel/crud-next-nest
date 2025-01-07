"use client"

import { useEffect, useState } from "react";

interface IPessoa {
  id: string | number | any;
  nome: string;
  cpf: string;
  telefone: string;
  salario: number;
  profissao: string;
}

export default function Home() {
  const [id, setId] = useState()
  const [pessoa, setPessoa] = useState<any>({})

  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [telefone, setTelefone] = useState("")
  const [salario, setSalario] = useState(0)
  const [profissao, setProfissao] = useState("")

  const [pessoas, setPessoas] = useState<any>([])

  useEffect(() => {
    obterPessoa()
  }, [])

  async function obterPessoa(){
    const resp = await fetch("http://localhost:3000/pessoa")
    const Pessoa = await resp.json()
    setPessoas(Pessoa)
  }

  async function criarPessoa() {
    await fetch('http://localhost:3000/pessoa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nome, cpf, telefone, salario, profissao}),
    })
    
    setNome('')
    setCpf('')
    setTelefone('')
    setSalario(0)
    setProfissao('')

    await obterPessoa()
  }

  async function alterarPessoa() {
    await fetch('http://localhost:3000/pessoa/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nome, cpf, telefone, salario, profissao}),
    })
    
    setNome('')
    setCpf('')
    setTelefone('')
    setSalario(0)
    setProfissao('')

    await obterPessoa()
  }

  async function excluirPessoa(id: any) {
    await fetch('http://localhost:3000/pessoa/' + id, {
      method: 'DELETE'
    })
    await obterPessoa()
  }

  async function obterPessoaPorId(id: any) {
    setId(id)

    const res = await fetch("http://localhost:3000/pessoa/" + id)
    const pessoa = await res.json()

    setNome(pessoa.nome)
    setCpf(pessoa.cpf)
    setTelefone(pessoa.telefone)
    setSalario(pessoa.salario)
    setProfissao(pessoa.profissao)
  }

  function renderizarFormPessoa(){
    return(
      <div className="w-[400px] gap-5 flex items-center flex-col bg-zinc-700 p-5 rounded">
        <div className="flex flex-col">
          <label htmlFor="nome">Nome</label>

          <input
            id="nome"
            type="text"
            placeholder="Fulano de Tal"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-[345px] rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
          />
        </div>

        <div className="gap-3 w-full px-2 flex items-center justify-between">
          <div className="flex flex-col">
            <label htmlFor="cpf">Cpf</label>

            <input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              className="w-[150px] rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="telefone">Telefone</label>

            <input
              id="telefone"
              type="text"
              placeholder="+55 (62) 99827-2193"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
              className="w-[180px] rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
            />
          </div>
        </div>

        <div className="gap-3 w-full px-2 flex items-center justify-between">
          <div className="flex flex-col">
            <label htmlFor="profissão">Profissão</label>

            <input
              id="profissão"
              type="text"
              placeholder="Engenheiro"
              value={profissao}
              onChange={e => setProfissao(e.target.value)}
              className="w-[150px] rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="desc">Salario</label>

            <input
              id="desc"
              type="number"
              placeholder="3499.99"
              value={salario}
              onChange={e => setSalario(+e.target.value)}
              className="w-[150px] rounded-md h-[35px] px-2 outline-none bg-slate-800 text-gray-300"
            />
          </div>
        </div>

        <div className="flex flex-col">
          {id ? (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={alterarPessoa}>Alterar</button>
          ) : (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={criarPessoa}>Cadastrar</button>
          )}
        </div>
      </div>
    )
  }

  function renderizarPessoa(){
    return(
      <div className="w-[400px] flex flex-col">
        {pessoas.map((pessoa: IPessoa) => (
          <div key={pessoa.id} className="flex items-center justify-between gap-10 bg-zinc-700 p-2 rounded-md">
            <div>{pessoa.nome}</div>
            <div>{pessoa.profissao}</div>
            <div className="flex gap-1">
              <button
                onClick={() => obterPessoaPorId(pessoa.id)}
                className="bg-green-500 p-2 rounded-md"
              >
                Alt.
              </button>

              <button
                onClick={() => excluirPessoa(pessoa.id)}
                className="bg-red-500 p-2 rounded-md"
              >
                Exc.
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return(
    <div className="gap-10 flex flex-col items-center justify-center h-screen text-white">
      {renderizarFormPessoa()}
      {renderizarPessoa()}
    </div>
  )
}