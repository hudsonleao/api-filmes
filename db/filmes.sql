-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14-Dez-2020 às 14:18
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `filmes`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `filmes`
--

CREATE TABLE `filmes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `diretores` varchar(255) NOT NULL,
  `generos` varchar(255) NOT NULL,
  `atores` varchar(255) NOT NULL,
  `resumo` varchar(1000) NOT NULL,
  `nota_media` varchar(3) NOT NULL DEFAULT 'N/A'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `filmes`
--

INSERT INTO `filmes` (`id`, `nome`, `diretores`, `generos`, `atores`, `resumo`, `nota_media`) VALUES
(1, 'Vingadores: Guerra Infinita', 'Anthony Russo, Joe Russo', 'Ação, Aventura, Drama', 'Robert Downey Jr., Chris Evans, Mark Ruffalo', 'Depois dos acontecimentos devastadores de Vingadores: Guerra Infinita (2018), o universo está em ruínas. Com a ajuda dos aliados restantes, os Vingadores se reúnem mais uma vez para reverter as ações de Thanos e restaurar o equilíbrio do universo.', 'N/A'),
(2, 'Velozes & Furiosos', 'Rob Cohen', 'Ação', 'Vin Diesel, Paul Walker, Michelle Rodriguez', 'O policial de Los Angeles, Brian O\'Conner, deve decidir onde realmente reside sua lealdade quando se apaixona pelo mundo das corridas de rua que foi enviado para destruir disfarçado.', 'N/A'),
(3, 'O Senhor dos Anéis: A Sociedade do Anel', 'Peter Jackson', 'Ação, Aventura, Drama', 'Elijah Wood, Ian McKellen, Orlando Bloom', 'Um manso Hobbit do Condado e oito companheiros partem em uma jornada para destruir o poderoso Um Anel e salvar a Terra-média do Lorde das Trevas Sauron.', 'N/A'),
(4, 'Harry Potter e a Pedra Filosofal', 'Chris Columbus', 'Aventura, Família, Fantasia', 'Daniel Radcliffe, Rupert Grint, Richard Harris', 'Um menino órfão se matricula em uma escola de magia, onde aprende a verdade sobre si mesmo, sua família e o terrível mal que assombra o mundo mágico.', 'N/A'),
(5, 'Star Wars: A Ascensão Skywalker', 'J.J. Abrams', 'Aventura, Família, Fantasia', 'Daisy Ridley, John Boyega, Oscar Isaac', 'Os membros sobreviventes da resistência enfrentam a Primeira Ordem mais uma vez, e o lendário conflito entre os Jedi e os Sith atinge seu auge, trazendo a saga Skywalker ao seu fim.', '3.5'),
(10, 'Han Solo: Uma História Star Wars', 'Ron Howard', 'Ação, Aventura', 'Alden Ehrenreich, Woody Harrelson, Emilia Clarke', 'Durante uma aventura no submundo do crime, Han Solo conhece seu futuro co-piloto Chewbacca e encontra Lando Calrissian anos antes de se juntar à Rebelião.', 'N/A');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `nivel` varchar(50) NOT NULL DEFAULT 'normal',
  `ativo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `senha`, `nivel`, `ativo`) VALUES
(1, 'admin', '25d55ad283aa400af464c76d713c07ad', 'admin', 1),
(2, 'normal', '25d55ad283aa400af464c76d713c07ad', 'normal', 1),
(4, 'hudsonleao', '25d55ad283aa400af464c76d713c07ad', 'normal', 1),
(5, 'administrador', '25d55ad283aa400af464c76d713c07ad', 'admin', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `votos`
--

CREATE TABLE `votos` (
  `id` int(11) NOT NULL,
  `filmes_id` int(11) NOT NULL,
  `usuarios_id` int(11) NOT NULL,
  `nota` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `votos`
--

INSERT INTO `votos` (`id`, `filmes_id`, `usuarios_id`, `nota`) VALUES
(11, 5, 1, 4),
(12, 5, 2, 3);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `filmes`
--
ALTER TABLE `filmes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `votos`
--
ALTER TABLE `votos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarios_id` (`usuarios_id`),
  ADD KEY `filmes_id` (`filmes_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `filmes`
--
ALTER TABLE `filmes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `votos`
--
ALTER TABLE `votos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `votos`
--
ALTER TABLE `votos`
  ADD CONSTRAINT `filmes_id` FOREIGN KEY (`filmes_id`) REFERENCES `filmes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarios_id` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
