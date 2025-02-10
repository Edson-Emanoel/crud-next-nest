"use client"

import { useEffect, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { FaMagnifyingGlass, FaPenToSquare, FaTrashCan } from "react-icons/fa6";

interface IPessoa {
  id: string | number | any;
  nome: string;
  cpf: string;
  telefone: string;
  salario: number;
  profissao: string;
}

export default function Pessoas() {
  const [id, setId] = useState<Number | String>()

  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [telefone, setTelefone] = useState("")
  const [salario, setSalario] = useState(0)
  const [profissao, setProfissao] = useState("")
  const [pessoas, setPessoas] = useState<any>([])

  const [filtroNome, setFiltroNome] = useState(""); // Estado para o filtro
  const [showForm, setShowForm] = useState("hidden")
  const [showPessoaList, setShowPessoaList] = useState("flex")

  useEffect(() => {
    obterPessoa()
  }, [])

  async function obterPessoa(){
    const resp = await fetch("http://localhost:3001/pessoa")
    const Pessoa = await resp.json()
    setPessoas(Pessoa)
  }

  async function criarPessoa() {
    await fetch('http://localhost:3001/pessoa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({nome, cpf, telefone, salario, profissao}),
    })
    
    setShowForm("hidden")
    setShowPessoaList("flex")

    setNome('')
    setCpf('')
    setTelefone('')
    setSalario(0)
    setProfissao('')

    await obterPessoa()
  }

  async function alterarPessoa() {
    await fetch('http://localhost:3001/pessoa/' + id, {
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
    setShowForm("hidden")
    setShowPessoaList("flex")
    await obterPessoa()
  }

  async function excluirPessoa(id: any, nome: string) {
    const confirm = window.confirm("Deseja apagar a pessoa: " + nome + " da lista?")

    if(confirm){
      await fetch('http://localhost:3001/pessoa/' + id, {
        method: 'DELETE'
      })
      await obterPessoa()
    } else {
      return true
    }
  }

  async function obterPessoaPorId(id: any) {
    setShowForm("flex")
    setShowPessoaList("hidden")
    setId(id)

    const res = await fetch("http://localhost:3001/pessoa/" + id)
    const pessoa = await res.json()

    setNome(pessoa.nome)
    setCpf(pessoa.cpf)
    setTelefone(pessoa.telefone)
    setSalario(pessoa.salario)
    setProfissao(pessoa.profissao)
  }

  function funcShowForm(){
    setShowForm("flex")
    setShowPessoaList("hidden")
  }

  function funcShowPessoaList(){
    setShowForm("hidden")
    setShowPessoaList("flex")

    setId("")
    setNome("")
    setCpf("")
    setTelefone("")
    setSalario(0)
    setProfissao("")
  }

  function renderizarFormPessoa(){
    return(
      <div className={`w-[400px] gap-5 ${showForm} flex items-center flex-col bg-zinc-900 p-5 rounded`}>
        <h1 className="text-zinc-300 self-start px-2">Formulário da Pessoa</h1>
              
        <div className="flex flex-col">
          <label htmlFor="nome">Nome</label>

          <input
            id="nome"
            type="text"
            placeholder="Fulano de Tal"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-[345px] rounded-md h-[35px] px-2 outline-none bg-zinc-800 text-gray-300"
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
              className="w-[150px] rounded-md h-[35px] px-2 outline-none bg-zinc-800 text-gray-300"
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
              className="w-[180px] rounded-md h-[35px] px-2 outline-none bg-zinc-800 text-gray-300"
            />
          </div>
        </div>

        <div className="gap-3 w-full px-2 flex items-center justify-between">
          <div className="flex flex-col">
            <label htmlFor="profissão">Profissão</label>

            {/* carregar categorias */}
            <select
              id="profissão"
              value={profissao}
              onChange={e => setProfissao(e.target.value)}
              className="w-[150px] rounded-md h-[35px] px-2 outline-none bg-zinc-800 text-gray-300"
            >
              <option value="Dev Junior">Dev Junior</option>
              <option value="Dev Pleno">Dev Pleno</option>
            </select>

          </div>

          <div className="flex flex-col">
            <label htmlFor="desc">Salario</label>

            <input
              id="desc"
              type="number"
              placeholder="3499.99"
              value={salario}
              onChange={e => setSalario(+e.target.value)}
              className="w-[150px] rounded-md h-[35px] px-2 outline-none bg-zinc-800 text-gray-300"
            />
          </div>
        </div>

        <div className="gap-5 flex">
          {id ? (
            <button className="bg-yellow-600 p-2 rounded-md outline-none" onClick={alterarPessoa}>Alterar</button>
          ) : (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={criarPessoa}>Cadastrar</button>
          )}
          <button className="bg-gray-500 p-2 rounded-md outline-none" onClick={funcShowPessoaList}>Cancelar</button>
        </div>
      </div>
    )
  }

  function filtrarPessoas() {
    return pessoas.filter((pessoa: IPessoa) =>
      pessoa.nome.toLowerCase().includes(filtroNome.toLowerCase())
    );
  }

  function renderizarFiltro() {
    return (
      <div className="w-[400px] h-[50px] mb-4 gap-3 flex items-center" >
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          className="w-full rounded-md outline-none p-2 bg-zinc-800 text-gray-300"
        />
        <button className="flex-1 bg-blue-600 p-3 rounded">
          <FaMagnifyingGlass />
        </button>
      </div>
    );
  }

  function renderizarPessoa() {
    const pessoasFiltradas = filtrarPessoas();

    return (
      <div className={`w-[400px] gap-2 flex flex-col ${showPessoaList} bg-zinc-900 w-[450] px-6 py-4 rounded-md`}>

        <h1 className="text-zinc-300 self-start px-2">Listagem de Pessoas</h1>

        { renderizarFiltro() }

        <div className="self-end">
          <button className="bg-green-700 w-10 h-10 rounded flex items-center justify-center" onClick={() => funcShowForm()}><FaPlusSquare className="text-2xl" /></button>
        </div>

        <div className="gap-2 flex flex-col">
          {pessoasFiltradas.map((pessoa: IPessoa) => (
            <div
              key={pessoa.id}
              className="flex items-center justify-between gap-8  bg-zinc-800 p-2 rounded-md"
            >
              <div className="flex items-center justify-between w-full">
                <span>{pessoa.nome}</span>
                <span>{pessoa.profissao}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => obterPessoaPorId(pessoa.id)}
                  className="bg-yellow-500 w-10 h-10 rounded-md flex items-center justify-center"
                >
                  <FaPenToSquare className="text-lg"/>
                </button>

                <button
                  onClick={() => excluirPessoa(pessoa.id, pessoa.nome)}
                  className="bg-red-500 w-10 h-10 rounded-md flex items-center justify-center"
                >
                  <FaTrashCan className="text-lg"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return(
    <div className="gap-10 flex flex-col items-center justify-center h-screen text-white">
      {renderizarFormPessoa()}
      {renderizarPessoa()}
    </div>
  )
}