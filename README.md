# 📚 The Accidental Collection: Um Inventário de Curiosidades

# Projeto Final da Imersão Dev Alura + Google

**Sobre o Projeto**

O "The Accidental Collection" é um catálogo de acervo pessoal dinâmico desenvolvido inteiramente com HTML, CSS e JavaScript puro (sem o uso de frameworks), respeitando rigorosamente as diretrizes e o escopo de complexidade da Imersão Dev.

O projeto transforma a Base de Conhecimento inicial em um catálogo de colecionáveis (Vinis, HQs e Figures) e destaca-se por sua lógica de dados e design autoral, garantindo alta pontuação em Apresentação e Eficácia.

# ✨ Conceito Visual: Museu Pop Alternativo
O projeto atinge o critério de Apresentação através de uma estética única denominada "Art-Meets-Science Retro-Modernism", que funde o rigor simétrico de Wes Anderson com o minimalismo moderno.

Design Rigoroso: A interface utiliza Simetria Rigorosa (elementos centrados e uniformes) e uma paleta de cores definida por variáveis CSS (:root) com tons de Amarelo Manteiga, Verde Musgo e Borgonha.

Card de Artefato: Os itens são exibidos em Cards que simulam molduras, com tipografia Serifada para títulos e Sans-Serif para o corpo.

Interatividade: Implementação do efeito de Zoom Interativo (transform: scale(1.15)) via CSS no hover, proporcionando uma experiência visual aprimorada.

# 💻 Funcionalidades Técnicas (Eficácia)
A Eficácia do projeto reside na robusta manipulação de dados no Front-End, o ponto crucial para a premiação:

Filtros Avançados por Categoria: O recurso central de pesquisa utiliza a função Array.prototype.filter() em JavaScript para classificar dinamicamente os itens por tipo (Vinil, Quadrinho, ActionFigure).

Busca Aprimorada: O campo de pesquisa realiza filtragem simultânea em três campos do data.json: Título, Autor e Descrição.

Métricas Dinâmicas (Placar Boxes): Contadores no cabeçalho atualizam a quantidade total e por categoria do acervo em tempo real.

Dados Assíncronos: O acervo é carregado de forma assíncrona (fetch()) a partir do data.json.

# ⚙️ Tecnologias Utilizadas
HTML5: Estrutura e semântica do projeto.

CSS3: Estilização, uso de variáveis CSS (:root), Flexbox e Grid para layout simétrico.

JavaScript (Puro): Lógica de busca, filtros, manipulação do DOM e carregamento de dados.
