-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-04-2022 a las 20:00:21
-- Versión del servidor: 8.0.18
-- Versión de PHP: 7.3.11;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rrhh`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `ID` int(11) NOT NULL,
  `CEDULA` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `NOMBRE` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `APELLIDO` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DEPARTAMENTO` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CARGO` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `FECHA_CONTRATACION` date NOT NULL,
  `VACACIONES` tinyint(1) NOT NULL DEFAULT '0',
  `ESTADO` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`ID`, `CEDULA`, `NOMBRE`, `APELLIDO`, `DEPARTAMENTO`, `CARGO`, `FECHA_CONTRATACION`, `VACACIONES`, `ESTADO`) VALUES
(1, '000-0000000-0', 'Leuris Joel', 'Morel Nuñez', 'Tecnología', 'Soporte Técnico', '2022-04-11', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nomina`
--

CREATE TABLE `nomina` (
  `ID` int(11) NOT NULL,
  `EMPLEADO_ID` int(11) NOT NULL,
  `SALARIO_BRUTO` float NOT NULL,
  `SALARIO_NETO` float DEFAULT NULL,
  `AFP` float DEFAULT NULL,
  `ARS` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nomina`
--

INSERT INTO `nomina` (`ID`, `EMPLEADO_ID`, `SALARIO_BRUTO`, `SALARIO_NETO`, `AFP`, `ARS`) VALUES
(1, 1, 30000, 28227, 861, 912);

--
-- Disparadores `nomina`
--
DELIMITER $$
CREATE TRIGGER `CALCULAR_DEDUCCIONES` BEFORE INSERT ON `nomina` FOR EACH ROW BEGIN
DECLARE ARS_ FLOAT;
DECLARE AFP_ FLOAT;
DECLARE SALARIO_NETO_ FLOAT;
SET ARS_ = new.SALARIO_BRUTO * 0.0304;
SET AFP_ = new.SALARIO_BRUTO * 0.0287; 
SET SALARIO_NETO_ = new.SALARIO_BRUTO - ARS_ - AFP_;
SET new.ARS = ARS_;
SET new.AFP = AFP_;
SET new.SALARIO_NETO = SALARIO_NETO_;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `ID` int(11) NOT NULL,
  `EMPLEADO_ID` int(11) NOT NULL,
  `FECHA_DE_PAGO` date NOT NULL,
  `NOMINA_ID` int(11) NOT NULL,
  `PAGO_TOTAL` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `EMPLEADO_ID` int(11) NOT NULL,
  `FECHA_SOLICITUD` date NOT NULL,
  `FECHA_INICIO` date NOT NULL,
  `FECHA_FIN` date NOT NULL,
  `APROBACION` tinyint(1) DEFAULT NULL,
  `FECHA_APROBACION` date DEFAULT NULL,
  `TIPO_PERMISO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_permiso`
--

CREATE TABLE `tipo_permiso` (
  `ID` int(11) NOT NULL,
  `TIPO` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL,
  `EMPLEADO_ID` int(11) NOT NULL,
  `USUARIO` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `CONTRASENA` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ROL` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ULTIMA_VEZ` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `EMPLEADO_ID`, `USUARIO`, `CONTRASENA`, `ROL`, `ULTIMA_VEZ`) VALUES
(1, 1, 'superadmin', '12345', 'superadmin', '2022-04-11 14:06:06');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `CEDULA_EMPLEADO` (`CEDULA`);

--
-- Indices de la tabla `nomina`
--
ALTER TABLE `nomina`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `EMPLEADO_NOMINA_FK` (`EMPLEADO_ID`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `EMPLEADO_PAGO_FK` (`EMPLEADO_ID`),
  ADD KEY `NOMINA_PAGO_FK` (`NOMINA_ID`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD KEY `EMPLEADO_PERMISO_FK` (`EMPLEADO_ID`);

--
-- Indices de la tabla `tipo_permiso`
--
ALTER TABLE `tipo_permiso`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `EMPLEADO_USUARIO_FK` (`EMPLEADO_ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `nomina`
--
ALTER TABLE `nomina`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pago`
--
ALTER TABLE `pago`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_permiso`
--
ALTER TABLE `tipo_permiso`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `nomina`
--
ALTER TABLE `nomina`
  ADD CONSTRAINT `EMPLEADO_NOMINA_FK` FOREIGN KEY (`EMPLEADO_ID`) REFERENCES `empleado` (`ID`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `EMPLEADO_PAGO_FK` FOREIGN KEY (`EMPLEADO_ID`) REFERENCES `empleado` (`ID`),
  ADD CONSTRAINT `NOMINA_PAGO_FK` FOREIGN KEY (`NOMINA_ID`) REFERENCES `nomina` (`ID`);

--
-- Filtros para la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD CONSTRAINT `EMPLEADO_PERMISO_FK` FOREIGN KEY (`EMPLEADO_ID`) REFERENCES `empleado` (`ID`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `EMPLEADO_USUARIO_FK` FOREIGN KEY (`EMPLEADO_ID`) REFERENCES `empleado` (`ID`);

DELIMITER $$
--
-- Eventos
--
CREATE DEFINER=`root`@`localhost` EVENT `HABILITAR_VACACIONES` ON SCHEDULE EVERY 1 DAY STARTS '2022-04-11 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
UPDATE empleado SET VACACIONES = TRUE WHERE FECHA_CONTRATACION = (CURDATE() - 12);
END$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
