console.log("TESTE SERVER");

import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

const users = []

app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erro ao buscar usuários' })
    }
})

app.post('/usuarios', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        })
        console.log(user)

        res.status(201).json({ message: 'Cadastro realizado com sucesso' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erro ao cadastrar usuário' })
    }
})



app.put('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: (req.params.id)
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        })
        res.status(200).json({ message: 'Usuário atualizado com sucesso' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erro ao atualizar usuário' })
    }
})

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const id = (req.params.id);
        await prisma.user.delete({
            where: { id }
        });
                
       res.status(200).json({ message: 'Usuário deletado com sucesso' })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Erro ao deletar usuário' })
        }
    })
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})

