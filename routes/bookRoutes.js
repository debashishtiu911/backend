import express from 'express';
const router =express.Router();
import { Book } from '../models/bookModel.js';

router.post('/',async (request,response)=>{
    try{
        if(!request.body.title|| !request.body.author||!request.body.publishYear){
            response.status(400).send({
                message : 'Send all required Fields : title ,AUthor ,publishYear',
            })
        }
        const newBook ={title:request.body.title,
            author : request.body.author,publishYear:request.body.publishYear
        };
        const book=await Book.create(newBook);
        return response.status(201).send(book);

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message : error.message});
    }
});

//Route for get ALL Books from database
router.get('/',async (request,response)=>{
    try{
        const book=await Book.find({});
        response.status(200).json({
            count : book.length,
            data:book
        });

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for get  Books by ID from database
router.get('/:id',async (request,response)=>{
    try{
        const {id}=request.params;

        const books=await Book.findById(id);
        response.status(200).json({
            count:books.length,
            data:books
        });

    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


//ROute for Update a Book
router.put('/:id',async (request,response)=>{
    try{
        if(!request.body.title|| !request.body.author||!request.body.publishYear){
            response.status(400).send({
                message : 'Send all required Fields : title ,AUthor ,publishYear',
            })
        }
        const {id} =request.params;
        const result =await Book.findByIdAndUpdate(id,request.body);

        if(!result) {
            return response.status(404).json({message:"book not Found"});
        }
        return response.status(200).send({message:"Book updated successfully"});


    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

//Route for deletiing book
router.delete('/:id',async (request,response)=>{
    try{
        
        const {id} =request.params;
        const result =await Book.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({message:"book not Found"});
        }
        return response.status(200).send({message:"Book deleted successfully"});


    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});


export default router;
