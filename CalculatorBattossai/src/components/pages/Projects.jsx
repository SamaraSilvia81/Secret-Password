import { useLocation  } from 'react-router-dom'
import { useState, useEffect} from 'react';

import {Message} from '../layout/Message';
import {Container} from '../layout/Container';
import {Loading} from '../layout/Loading';
import {LinkButton} from '../layout/LinkButton';

import {ProjectCard} from '../project/ProjectCard';

import styles from './Projects.module.css';
import {motion} from 'framer-motion'

import {Input} from '../form/Input'
import {DollarStore} from "../zustand/DollarStore";

export function Projects(){

    // Estado responsável pelo get do DollarStore
    const dollar = DollarStore(state => state.dollar);
    // Estado responsável pelo set do DollarStore
    const setDollar = DollarStore(state => state.setDollar);

   useEffect(() => {
        fetch("http://localhost:5000/currencies/2")
          .then(res => res.json())
          .then(data => setDollar(data.value))
          .catch(e => console.log(e));
      }, [dollar]);

    const [projects, setProjects] = useState([]); // estado para salvar os projetos
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('') // como a message vem pelo redirect, e não temos nada cadastrado aqui vamos criar um state.

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
        console.log(location)
    }

    // Para buscar todos os projetos
    // Usamos o useEffect para evitar que loop infinito de requisições
    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects",{
                method: 'GET',
                headers:{
                    'Content-Type':"application/json"
                }
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setProjects(
                    data.map((project) => {
                        let newPrice = project.price;
                        if (project.currency.name === "USD") {
                            newPrice = (project.price * dollar).toFixed(2);
                        }
                        return {
                            ...project,
                            converted_price: newPrice
                        }
                    })
                );
                setRemoveLoading(true) // quando os projetos forem carregados, então ele se remove
            })
            .catch((e) => console.log(e))  // assim conseguiremos debuggar depois
        }, 400)
    },[dollar])  // estaremos controlando um array vazio
    

    // Atualizar todos os campos com o novo dollar
    useEffect(() => {
        setProjects(prevProjects => {
            return prevProjects.map(project => {
                let convertedPrice = project.price;
                if (project.currency.name === "USD") {
                    convertedPrice = project.price * dollar;
                }
                return {
                    ...project,
                    converted_price: convertedPrice
                };
            });
        });
    }, [dollar]);
      
    // Método para remover o projeto  + fecth
    const removeProject = (id) => {
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            },
        })
        .then((res) => res.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage("Projeto removido com sucesso!")
        })
        .catch((e) => console.log(e))
    }

    const handleDollarChange = (e) => {

        const newValue = parseFloat(e.target.value);
        setDollar(newValue);

        fetch("http://localhost:5000/currencies/2", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                value: parseFloat(newValue)
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            // atualizar o valor da moeda em todos os projetos
            setProjects(
                projects.map((project) => ({
                    ...project,
                    //converted_price: (project.price * newValue).toFixed(2),
                    //budgetTotal: (project.budget * newValue).toFixed(2),
                    // quantityCategory: project.quantityCategory,
                    //quantityTime: project.quantityTime
                }))
            );
        })
        .catch(e => console.log(e));
    };

    return (
       <motion.div 
            className={styles.project_container}
            initial={{width:0}}
            animate={{width:'100%'}}
            exit={{x:window.innerWidth,transition:{duration:0.1}}}
       >
        <div className={styles.title_container}>
            <h1>Meus Produtos</h1>
            <LinkButton to='/newproject' text='Novo Produto'/>
        </div>
        { message && <Message type='sucess' msg={message} />}
        { projectMessage && <Message type='sucess' msg={projectMessage} />}
       <Container customClass='start'>
        { projects.length > 0 && (
            projects.map((project) => <ProjectCard
                key={project.id} 
                id={project.id}
                name={project.name}
                dolar={project.dolar}
                budget={project.budgetTotal}
                time={project?.time?.name}
                quantityTime={project.quantityTime}
                quantityCategory={project.quantityCategory}
                price={project.converted_price}
                convertedPrice={project.converted_price}
                currency={project?.currency?.name}
                category={project?.category?.name}
                handleRemove={removeProject}
            />))}
            {/*If que representa quando os projetos não estão sendo carregados*/}
            {!removeLoading && <Loading/>}
            {/*If quando não existe nenhum projeto*/}
            {removeLoading && projects.length === 0 && (
                <p>Não há projetos cadastrados!</p>
            )
            }
       </Container>
       <div className={styles.dollar}>
            <Input
                type="number"
                name="dollar"
                text='Valor do dólar:'
                placeholder="Digite o valor atual do dólar"
                value={dollar}
                handleOnChange={handleDollarChange}
            />
        </div>
       </motion.div>
    )
}