const fileService = require('../services/fileService')
const fs = require('fs')
const User = require('../models/User')
const File = require('../models/File')
const Uuid = require('uuid')

class FileController {
    async createDir(req, res) {
        try {
            const { name, type, parent } = req.body
            const file = new File({ name, type, parent, user: req.user.id })
            const parentFile = await File.findOne({ _id: parent })
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }
    async getFiles(req, res) {
        try {
            const files = await File.find({ user: req.user.id, parent: req.query.parent });
            return res.json(files)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Не могу получить файлы" })
        }
    }
    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const parent = await File.findOne({ user: req.user.id, _id: req.body.parent })
            const user = await User.findOne({ _id: req.user.id })

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({ message: 'На диске нет места' })
            }
            user.usedSpace = user.usedSpace + file.size
            let path;
            if (parent) {
                path = `${process.env.FilePath}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${process.env.FilePath}\\${user._id}\\${file.name}`
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({ message: 'Файл уже существует' })
            }
            file.mv(path)

            const type = file.name.split('.').pop()
            let filePath = file.name
            if (parent) {
                filePath = parent.path + "\\" + file.name
            }
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            });

            await dbFile.save()
            await user.save()
            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({ message: "Ошибка загрузки" })
        }
    }
    async downloadFile(req, res) {
        try {
            const file = await File.findOne({ _id: req.query.id, user: req.user.id })
            const path = fileService.getPath(file)
            if (fs.existsSync(path)) {
                return res.download(path, file.name)
            }
            return res.status(400).json({ message: "Ошибка загрузки" })
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: "Ошибка загрузки" })
        }
    }
    async deleteFile(req, res) {
        try {
            const file = await File.findOne({ _id: req.query.id, user: req.user.id })
            if (!file) {
                return res.status(400).json({ message: 'файл не найден' })
            }
            fileService.deleteFile(file)
            await file.remove()
            return res.json({ message: 'Файл был удален' })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ message: 'Каталог не пуст' })
        }
    }
}

module.exports = new FileController()
