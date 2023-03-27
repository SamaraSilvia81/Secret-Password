import { useState, useEffect} from 'react'

import {Input} from '../form/Input'
import {Select} from '../form/Select'
import {SubmitButton} from '../form/SubmitButton'
import {Message} from '../layout/Message'

import styles from './ProjectForm.module.css'

import {DollarStore} from "../zustand/DollarStore";

export function ProjectForm({btnText, handleSubmit, projectData}){

  //const dollar = DollarStore((state) => state.dollar);
  //const { dollar } = DollarStore();
  const dollar = DollarStore((state) => state.dollar)
    
  // Select das Categorias (banco de dados)
  const [categories, setCategories] = useState([])

  // Select das Moedas (banco de dados)
  const [currencies, setCurrencies] = useState([])
  
  // Select do Tempo (banco de dados)
  const [times, setTimes] = useState([])

  // Estado que representa as mensagens
  const [message, setMessage] = useState()

  // Estado que representa o tipo da mensagem
  const [typeMessage, setTypeMessage] = useState()

  // Estado de todos os projetos
  // const [project, setProject] = useState(projectData || {})
  const [project, setProject] = useState(projectData || {
    name: '',
    budget: '',
    currency: {
      id: '',
      name: '',
    },
    dolar: null,
    converted_budget: null,
    products: [], // novo campo para armazenar os produtos
  });

  // Estado da moeda
  const [currency, setCurrency] = useState("BRL");

  // Estado do valor convertido
  const [convertedPrice, setConvertedPrice] = useState(projectData ? projectData.converted_price : null);

  // Estado do orçamento total
  const [budget, setBudget] = useState(convertedPrice || project.quantityCategory || project.quantityTime);

  // Requisição de API para buscar as categorias
  useEffect(() => {
      fetch("http://localhost:5000/categories",{
      method: 'GET',
      headers:{
          'Content-Type':"application/json"
      }
  })
      .then((res) => res.json())
      .then((data) => {
          setCategories(data)
      })
      .catch((e) => console.log(e))
  },[])

  // Requisição de API para buscar as moedas
  useEffect(() => {
    fetch('http://localhost:5000/currencies', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrencies(data)
      })
      .catch((e) => console.log(e))
    }, [])

  // Requisição de API para buscar o período
  useEffect(() => {
    fetch('http://localhost:5000/time', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
      .then((res) => res.json())
      .then((data) => {
        setTimes(data)
      })
      .catch((e) => console.log(e))
    }, [])

  const budgetTotal = (quantityTime, quantityCategory) => {
    let total = quantityTime * quantityCategory * convertedPrice;
    setBudget(total);
    console.log("total:", total);
  };

  // Método para enviar formulário
  const submit = (e) => {
    e.preventDefault();

    if (!project.name || !project.price || !project.quantityCategory || !project.quantityTime || !project.time || !project.currency || !project.category) {
      setMessage("Por favor, preencha todos os campos.");
      setTypeMessage("error");
      return;
    }

    handleSubmit({ 
      ...project, 
      converted_price: convertedPrice,
      budgetTotal: budget
    });

    console.log('Enviando os dados...');
  };

  // Método para captar as opções das categorias
  const handleCategory = (e) => {
    setProject({...project, category:{
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
  }

    // Método para captar as opções do período de tempo
    const handleTime = (e) => {
      setProject({...project, time:{
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      })
    }
  
    // Método para captar os dados dos inputs de entrada - nome e orçamento
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProject({ ...project, [name]: value });

      const newConvertedBudget = convertCurrency(project.price);
      setConvertedPrice(newConvertedBudget);
    }

    const convertCurrency = (value, currency) => {
      const conversionRate = currency === '1' ? 1.0 : dollar;
      return (parseFloat(value) * conversionRate).toFixed(2);
    };

    const handleCurrency = (e) => {
      const newCurrency = e.target.value;
      setCurrency(newCurrency);

      setProject({
        ...project,
        currency: {
          id: e.target.value,
          name: e.target.options[e.target.selectedIndex].text,
        },
      });
  
      const newConvertedPrice = convertCurrency(project.price, newCurrency, project.dolar);
      setConvertedPrice(newConvertedPrice);
    };

    // Altere o método handleCurrency para atualizar apenas o estado da moeda selecionada
    const handlePriceChange = (e) => {
      const priceValue = e.target.value;
      setProject({
        ...project,
        price: priceValue
      });
    };

    /*const handleDolarChange = (e) => {
      const dolarValue = e.target.value;
      setProject({
        ...project,
        dolar: dolarValue
      });
    };*/

  return (

    <form onSubmit={submit} className={styles.form}>
        {message && <Message type={typeMessage} msg={message}/>}
        <div className={styles.form_body}>
         <div className={`${styles.column} ${styles.column01}`}>
            <Input 
              type='text' 
              text='Nome do Fabricante' 
              name='name'
              placeholder='Insira o nome do fabricante'
              value={project.name ? project.name : ''}
              handleOnChange={handleChange}
            />
            <Input 
              type='number' 
              text='Preço do Produto' 
              name='price'
              placeholder='Insira o preço do produto'
              value={project.price ? project.price : ''}
              handleOnChange={handlePriceChange}
            />
             {/*<Input 
              type="number"
              text='Valor do dólar' 
              name="dolar" 
              placeholder='Insira o valor do dólar'
              value={project.dolar ? project.dolar : ''} 
              handleOnChange={handleDolarChange}
  />*/}
            <Select 
                name='currency' 
                text='Selecione a moeda'
                options={currencies}
                handleOnChange={handleCurrency}
                value={project.currency ? project.currency.id: ''}
            />
            <Input
                type="number"
                text="Orçamento convertido:"
                name="converted_price"
                placeholder="Orçamento convertido"
                value={convertedPrice ? convertedPrice : ''}
                handleOnChange={(e) => {
                  budgetTotal(convertedPrice, e.target.value);
                }}
                disabled
            />
            <Select 
              name='category_id' 
              text='Selecione a categoria'
              options={categories}
              handleOnChange={handleCategory}
              value={project.category ? project.category.id: ''}
            />
         </div>
         <div className={styles.column}>
          <Input 
              type='number' 
              text='Quantidade do produto' 
              name='quantityCategory'
              placeholder='Tempo da categoria: 2 Hosts...'
              value={project.quantityCategory ? project.quantityCategory : ''}
              handleOnChange={(e) => {
                setProject({ ...project, quantityCategory: e.target.value });
                budgetTotal(project.quantityTime, e.target.value);
              }}
            />
              <Select 
              name='time_id' 
              text='Selecione o período'
              options={times}
              handleOnChange={handleTime}
              value={project.time ? project.time.id: 'Mês'}
            />
              <Input 
              type='number' 
              text='Quantidade de tempo' 
              name='quantityTime'
              placeholder='Tempo do período: 2 semanas...'
              value={project.quantityTime ? project.quantityTime : ''}
              handleOnChange={(e) => {
                setProject({ ...project, quantityTime: e.target.value });
                budgetTotal(e.target.value, project.quantityCategory);
              }}
            />
            <Input
                type="number"
                text="Orçamento total:"
                name="budget"
                placeholder="Orçamento total"
                value={budget ? budget : ''}
                disabled
            />
         </div>
        </div>
        <div className={styles.form_btn}>
          <SubmitButton text={btnText} handleSubmit={handleSubmit}/>
        </div>
    </form>
    )
}