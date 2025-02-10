"use client"

import { useEffect, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { FaMagnifyingGlass, FaPenToSquare, FaTrashCan } from "react-icons/fa6";

interface ICategoria {
  id: string | number | any;
  codigo: string;
  nome: string;
}

export default function Categorias() {
  const [id, setId] = useState<Number | String>()

  const [codigo, setCodigo] = useState("")
  const [nome, setNome] = useState("")
  const [categorias, setCategorias] = useState<any>([])

  const [filtroNome, setFiltroNome] = useState(""); // Estado para o filtro
  const [showForm, setShowForm] = useState("hidden")
  const [showCategoriaList, setshowCategoriaList] = useState("flex")

  useEffect(() => {
    obterCategoria()
  }, [])

  async function obterCategoria(){
    const resp = await fetch("http://localhost:3001/categoria")
    const Categoria = await resp.json()
    setCategorias(Categoria)
  }

  async function criarCategoria() {
    await fetch('http://localhost:3001/categoria', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({codigo, nome}),
    })
    
    setShowForm("hidden")
    setshowCategoriaList("flex")

    setNome('')
    setCodigo('')

    await obterCategoria()
  }

  async function alterarCategoria() {
    await fetch('http://localhost:3001/categoria/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({codigo, nome}),
    })
    
    setCodigo('')
    setNome('')

    await obterCategoria()
  }

  async function excluirCategoria(id: any, nome: string) {
    const confirm = window.confirm("Deseja apagar a categoria: " + nome + " da lista?")

    if(confirm){
      await fetch('http://localhost:3001/categoria/' + id, {
        method: 'DELETE'
      })
      await obterCategoria()
    } else {
      return true
    }
  }

  async function obterCategoriaPorId(id: any) {
    setShowForm("flex")
    setshowCategoriaList("hidden")
    setId(id)

    const res = await fetch("http://localhost:3001/categoria/" + id)
    const categoria = await res.json()

    setCodigo(categoria.codigo)
    setNome(categoria.nome)
  }

  function funcShowForm(){
    setShowForm("flex")
    setshowCategoriaList("hidden")
  }

  function funcshowCategoriaList(){
    setShowForm("hidden")
    setshowCategoriaList("flex")

    setId("")
    setCodigo("")
    setNome("")
  }

  function renderizarFormCategoria(){
    return(
      <div className={`w-[400px] gap-5 ${showForm} flex items-center flex-col bg-zinc-900 p-5 rounded`}>
        <h1 className="text-zinc-300 self-start px-2">Formulário da Categoria</h1>

        <div className="gap-3 w-full px-2 flex items-center justify-between">
          <div className="flex flex-col">
            <label htmlFor="codigo">Código</label>

            <input
              id="codigo"
              type="text"
              placeholder="0.00.0"
              value={codigo}
              onChange={e => setCodigo(e.target.value)}
              className="w-[150px] rounded-md h-[35px] px-2 outline-none bg-zinc-800 text-gray-300"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="nome">Nome</label>

          <input
            id="nome"
            type="text"
            placeholder="Categoria de Tal"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-[345px] rounded-md h-[35px] px-2 outline-none bg-zinc-800 text-gray-300"
          />
        </div>

        <div className="gap-5 flex">
          {id ? (
            <button className="bg-yellow-600 p-2 rounded-md outline-none" onClick={alterarCategoria}>Alterar</button>
          ) : (
            <button className="bg-blue-600 p-2 rounded-md outline-none" onClick={criarCategoria}>Cadastrar</button>
          )}
          <button className="bg-gray-500 p-2 rounded-md outline-none" onClick={funcshowCategoriaList}>Cancelar</button>
        </div>
      </div>
    )
  }

  function filtrarPessoas() {
    return categorias.filter((categoria: ICategoria) =>
      categoria.nome.toLowerCase().includes(filtroNome.toLowerCase())
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

  function renderizarCategoria() {
    const categoriasFiltradas = filtrarPessoas();

    return (
      <div className={`w-[400px] gap-2 flex flex-col ${showCategoriaList} bg-zinc-900 w-[450] px-6 py-4 rounded-md`}>

        <h1 className="text-zinc-300 self-start px-2">Listagem de Categoria</h1>

        { renderizarFiltro() }

        <div className="self-end">
          <button className="bg-green-700 w-10 h-10 rounded flex items-center justify-center" onClick={() => funcShowForm()}><FaPlusSquare className="text-2xl" /></button>
        </div>

        <div className="gap-2 flex flex-col">
          {categoriasFiltradas.map((categoria: ICategoria) => (
            <div
              key={categoria.id}
              className="flex items-center justify-between gap-8  bg-zinc-800 p-2 rounded-md"
            >
              <div className="gap-5 flex items-center justify-center w-full">
                <span>{categoria.codigo}</span>
                <span>{categoria.nome}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => obterCategoriaPorId(categoria.id)}
                  className="bg-yellow-500 w-10 h-10 rounded-md flex items-center justify-center"
                >
                  <FaPenToSquare className="text-lg"/>
                </button>

                <button
                  onClick={() => excluirCategoria(categoria.id, categoria.nome)}
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
      {renderizarFormCategoria()}
      {renderizarCategoria()}
    </div>
  )
}