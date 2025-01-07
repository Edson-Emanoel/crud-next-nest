-- CreateTable
CREATE TABLE "Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "salario" REAL NOT NULL,
    "profissao" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_nome_key" ON "Pessoa"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpf_key" ON "Pessoa"("cpf");
