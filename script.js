// 1. Variáveis de Referência do DOM (Usando IDs e Classes do index.html)
const collectionGrid = document.getElementById('collection-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');

// Elementos de métricas (Placar Boxes)
const totalCount = document.querySelector('#total-count span');
const vinylCount = document.querySelector('#vinyl-count span');
const comicsCount = document.querySelector('#comics-count span');
const actionFigureCount = document.querySelector('#actionfigure-count span');

let collectionData = []; // Array que armazenará os dados do data.json

// 2. Função para Carregar os Dados
async function carregarDados() {
    try {
        // Usa fetch() para carregar o data.json com o acervo de colecionáveis
        const resposta = await fetch("data.json"); 
        collectionData = await resposta.json();
        
        initializeApp();

    } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
        // Mensagem de erro alinhada ao design
        collectionGrid.innerHTML = '<p style="color: var(--color-text);">Erro ao carregar o acervo. Verifique o data.json.</p>'; 
    }
}

// 3. Função de Renderização (CRUCIAL: Cria o Card de Artefato)
function renderCollection(data) {
    // Limpa o container antes de adicionar novos cards
    collectionGrid.innerHTML = "";

    // Mapeia o array para strings HTML (Método eficiente)
    const cardsHTML = data.map(item => {
        // Estrutura do Card de Artefato com todos os metadados (Layout Interno)
        return `
            <article class="collection-card" data-tipo="${item.tipo}">
                <img src="${item.imageUrl}" alt="Capa de ${item.titulo}" loading="lazy">
                <p class="card-title">${item.titulo}</p>
                <div class="card-details">
                    <p>Autor: ${item.autor} | Ano: ${item.ano}</p>
                    <p>Mídia: ${item.midia}</p>
                    <p>Status: <strong>${item.status}</strong></p>
                </div>
                <p class="card-description">${item.descricao}</p>
            </article>
        `;
    }).join('');

    collectionGrid.innerHTML = cardsHTML;

    // Mensagem para nenhum resultado (Usabilidade)
    if (data.length === 0) {
        collectionGrid.innerHTML = '<p class="no-results" style="grid-column: 1 / -1; font-style: italic; padding: 20px; color: var(--color-text);">Nenhum artefato encontrado com o filtro e a busca atuais.</p>';
    }
}

// 4. Lógica de Filtro e Busca Central (Eficácia: Demonstra Array.filter)
function handleFilterAndSearch() {
    // A. Identifica o filtro de categoria ativo (data-filter)
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    
    // B. Pega o termo de busca (para busca por texto)
    const searchText = searchInput.value.toLowerCase();
    
    // C. Filtra o array de dados original (collectionData)
    const filteredData = collectionData.filter(item => {
        
        // C1. Filtro por Categoria (Tipo)
        const isMusic = activeFilter === 'Vinil' && (item.tipo === 'Vinil' || item.tipo === 'CD');
        const matchesType = activeFilter === 'all' || item.tipo === activeFilter || isMusic;
        
        // C2. Filtro por Busca (título, autor OU descrição)
        const matchesSearch = item.titulo.toLowerCase().includes(searchText) || 
                              item.autor.toLowerCase().includes(searchText) ||
                              item.descricao.toLowerCase().includes(searchText);
        
        // Retorna True apenas se ambos os critérios forem atendidos
        return matchesType && matchesSearch;
    });

    // D. Renderiza a coleção filtrada (handleFilterAndSearch substitui o antigo iniciarBusca)
    renderCollection(filteredData);
    
    // As métricas totais não são afetadas pela busca (updateMetrics é chamado apenas na inicialização)
}

// 5. Função para Atualizar Métricas (Utilidade)
function updateMetrics() {
    // Total de itens na coleção completa (para os placar boxes)
    totalCount.textContent = collectionData.length; 
    
    // Contagem usando filter()
    const vinyls = collectionData.filter(item => item.tipo === 'Vinil' || item.tipo === 'CD').length;
    const comics = collectionData.filter(item => item.tipo === 'Quadrinho').length;
    const actionfigures = collectionData.filter(item => item.tipo === 'ActionFigure').length;
    

    vinylCount.textContent = vinyls;
    comicsCount.textContent = comics;
    actionFigureCount.textContent = actionfigures;
}


// 6. Adiciona Listeners de Evento (Interação)
function addEventListeners() {
    // Listener para os Botões de Filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Lógica para marcar o botão ativo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            handleFilterAndSearch();
        });
    });

    // Listener para o Input de Busca (Busca dinâmica)
    searchInput.addEventListener('input', handleFilterAndSearch);
}

// 7. Inicialização da Aplicação
function initializeApp() {
    addEventListeners();
    renderCollection(collectionData);
    // Define o filtro "Tudo" como ativo por padrão
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active'); 
    updateMetrics(); 
}

// Inicia o Carregamento dos Dados
document.addEventListener('DOMContentLoaded', carregarDados);