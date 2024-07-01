import React, { useState } from 'react';
import { addQuarto } from '../utils/FuncoesAPI';

const AddQuarto = () => {
    const [novoQuarto, setNovoQuarto] = useState({
        photo: null,
        tipoQuarto: "",
        precoQuarto: ""
    });

    const [previaImagem, setPreviaImagem] = useState("");
    const [mensagemSucesso, setMensagemSucesso] = useState("");
    const [mensagemErro, setMensagemErro] = useState("");

    const handleMudaInputQuarto = (e) => {
        const nome = e.target.nome;
        let value = e.target.value;

        if (nome === "precoQuarto") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }
        }
        setNovoQuarto({ ...novoQuarto, [nome]: value });
    }

    const handleMudaImagem = (e) => {
        const imagemSelecionada = e.target.files[0];
        setNovoQuarto({...novoQuarto, photo: imagemSelecionada});
        setPreviaImagem(URL.createObjectURL(imagemSelecionada));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const sucesso = await addQuarto(novoQuarto.photo, novoQuarto.tipoQuarto, novoQuarto.precoQuarto);
            if(sucesso != undefined){
                setMensagemSucesso("Novo quarto  adicionado com sucesso!");
                setNovoQuarto({photo: null, tipoQuarto: "", precoQuarto: ""});
                setPreviaImagem("");
                setMensagemErro("");
            } else {
                setMensagemErro("Erro ao adicionar quarto novo.")
            }
        } catch(error) {
            setMensagemErro(error);
        }

    }

    return (
        <>
        <section className="container mt-5, mb-5">
            <div className="row justify-content-center">

                <div className='col-md-8  col-lg-6'>
                    <h2 className='mt-5 mb-2'>Adicione um novo quarto</h2>

                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="tipoQuarto" className='form-label'>
                             Tipo Sala
                            </label>
                            <div></div>
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="precoQuarto" className='form-label'>
                             Preço Quarto
                            </label>
                            <input
                            className='form-control'
                            required
                            id="precoQuarto"
                            type="number  "
                            name='precoQuarto'
                            value={novoQuarto.precoQuarto}
                            onChange={handleMudaInputQuarto}
                            />
                        </div>

                    <div className='mb-3'>
                        <label htmlFor="photo" className='form-label'>
                            Foto Quarto
                        </label>
                        <input
                        id="photo"
                        name="photo"
                        type="file"
                        className='form-control'
                        onChange={handleMudaImagem}
                        />
                        {previaImagem &&  (
                            <img src={previaImagem}
                            alt="Foto Previa Imagem"
                            style={{maxWidth: "400px", maxHeight: "400px"}}
                            className='mb-3'/>
                        )}

                    </div>

                    <div className='d-grid d-md-flex mt-2'>
                        <button className='btn btn-outline-primary ml-5'>
                            Salvar Quarto
                        </button>

                    </div>
                    </form>
                </div>
            </div>
        </section>

        </>
    );
}

export default AddQuarto;
