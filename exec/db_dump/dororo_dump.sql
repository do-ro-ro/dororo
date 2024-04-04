--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.links (
    accident_volume integer DEFAULT 0 NOT NULL,
    link_distance double precision NOT NULL,
    link_gid integer NOT NULL,
    traffic integer DEFAULT 0 NOT NULL,
    f_node_id character varying(255) NOT NULL,
    link_id character varying(255) NOT NULL,
    road_type character varying(255) NOT NULL,
    t_node_id character varying(255) NOT NULL
);


ALTER TABLE public.links OWNER TO postgres;

--
-- Name: links_link_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.links_link_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.links_link_gid_seq OWNER TO postgres;

--
-- Name: links_link_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.links_link_gid_seq OWNED BY public.links.link_gid;


--
-- Name: maps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.maps (
    map_completion boolean DEFAULT false NOT NULL,
    map_distance real NOT NULL,
    map_id integer NOT NULL,
    original_map_id integer DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    map_image character varying(255) DEFAULT ''::character varying NOT NULL,
    map_name character varying(255) NOT NULL,
    map_type character varying(255) NOT NULL,
    map_route_axis public.geometry(LineString,4326) NOT NULL,
    CONSTRAINT maps_map_type_check CHECK (((map_type)::text = ANY ((ARRAY['DEFAULT'::character varying, 'CUSTOM'::character varying, 'SCRAP'::character varying])::text[])))
);


ALTER TABLE public.maps OWNER TO postgres;

--
-- Name: maps_map_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.maps_map_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.maps_map_id_seq OWNER TO postgres;

--
-- Name: maps_map_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.maps_map_id_seq OWNED BY public.maps.map_id;


--
-- Name: nodes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nodes (
    node_gid integer NOT NULL,
    node_id character varying(255) NOT NULL,
    node_name character varying(255) NOT NULL,
    node_type character varying(255) NOT NULL,
    node_point public.geometry(Point,4326) NOT NULL
);


ALTER TABLE public.nodes OWNER TO postgres;

--
-- Name: nodes_node_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nodes_node_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nodes_node_gid_seq OWNER TO postgres;

--
-- Name: nodes_node_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nodes_node_gid_seq OWNED BY public.nodes.node_gid;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    map_id integer NOT NULL,
    post_id integer NOT NULL,
    scrap_count integer NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    post_content character varying(255) NOT NULL,
    post_title character varying(255) NOT NULL,
    review_ref character varying(255) NOT NULL,
    writer_unique_id character varying(255) NOT NULL
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_post_id_seq OWNER TO postgres;

--
-- Name: posts_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_post_id_seq OWNED BY public.posts.post_id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    post_id integer NOT NULL,
    review_ref character varying(255) NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: turn_infos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.turn_infos (
    turn_info_gid integer NOT NULL,
    ed_link_id character varying(255) NOT NULL,
    node_id character varying(255) NOT NULL,
    st_link_id character varying(255) NOT NULL,
    turn_type character varying(255) NOT NULL
);


ALTER TABLE public.turn_infos OWNER TO postgres;

--
-- Name: turn_infos_turn_info_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.turn_infos_turn_info_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.turn_infos_turn_info_gid_seq OWNER TO postgres;

--
-- Name: turn_infos_turn_info_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.turn_infos_turn_info_gid_seq OWNED BY public.turn_infos.turn_info_gid;


--
-- Name: turninfos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.turninfos (
    turn_info_gid integer NOT NULL,
    ed_link_id character varying(255) NOT NULL,
    node_id character varying(255) NOT NULL,
    st_link_id character varying(255) NOT NULL,
    turn_type character varying(255) NOT NULL
);


ALTER TABLE public.turninfos OWNER TO postgres;

--
-- Name: turninfos_turn_info_gid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.turninfos_turn_info_gid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.turninfos_turn_info_gid_seq OWNER TO postgres;

--
-- Name: turninfos_turn_info_gid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.turninfos_turn_info_gid_seq OWNED BY public.turninfos.turn_info_gid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    name character varying(255) NOT NULL,
    nickname character varying(255) NOT NULL,
    profile_image character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    unique_id character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: links link_gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links ALTER COLUMN link_gid SET DEFAULT nextval('public.links_link_gid_seq'::regclass);


--
-- Name: maps map_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maps ALTER COLUMN map_id SET DEFAULT nextval('public.maps_map_id_seq'::regclass);


--
-- Name: nodes node_gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nodes ALTER COLUMN node_gid SET DEFAULT nextval('public.nodes_node_gid_seq'::regclass);


--
-- Name: posts post_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN post_id SET DEFAULT nextval('public.posts_post_id_seq'::regclass);


--
-- Name: turn_infos turn_info_gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turn_infos ALTER COLUMN turn_info_gid SET DEFAULT nextval('public.turn_infos_turn_info_gid_seq'::regclass);


--
-- Name: turninfos turn_info_gid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turninfos ALTER COLUMN turn_info_gid SET DEFAULT nextval('public.turninfos_turn_info_gid_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.links (accident_volume, link_distance, link_gid, traffic, f_node_id, link_id, road_type, t_node_id) FROM stdin;
\.


--
-- Data for Name: maps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.maps (map_completion, map_distance, map_id, original_map_id, user_id, map_image, map_name, map_type, map_route_axis) FROM stdin;
\.


--
-- Data for Name: nodes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nodes (node_gid, node_id, node_name, node_type, node_point) FROM stdin;
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (map_id, post_id, scrap_count, created_at, updated_at, post_content, post_title, review_ref, writer_unique_id) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (post_id, review_ref) FROM stdin;
\.


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Data for Name: turn_infos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turn_infos (turn_info_gid, ed_link_id, node_id, st_link_id, turn_type) FROM stdin;
\.


--
-- Data for Name: turninfos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.turninfos (turn_info_gid, ed_link_id, node_id, st_link_id, turn_type) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, name, nickname, profile_image, role, unique_id) FROM stdin;
1	김영후	더운 사자	0322이미지 경로	ROLE_USER	e0fd8YmjvfSCgn
\.


--
-- Name: links_link_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.links_link_gid_seq', 1, false);


--
-- Name: maps_map_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.maps_map_id_seq', 1, false);


--
-- Name: nodes_node_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nodes_node_gid_seq', 1, false);


--
-- Name: posts_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_post_id_seq', 1, false);


--
-- Name: turn_infos_turn_info_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turn_infos_turn_info_gid_seq', 1, false);


--
-- Name: turninfos_turn_info_gid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.turninfos_turn_info_gid_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (link_gid);


--
-- Name: maps maps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maps
    ADD CONSTRAINT maps_pkey PRIMARY KEY (map_id);


--
-- Name: nodes nodes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nodes
    ADD CONSTRAINT nodes_pkey PRIMARY KEY (node_gid);


--
-- Name: posts posts_map_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_map_id_key UNIQUE (map_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- Name: turn_infos turn_infos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turn_infos
    ADD CONSTRAINT turn_infos_pkey PRIMARY KEY (turn_info_gid);


--
-- Name: turninfos turninfos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.turninfos
    ADD CONSTRAINT turninfos_pkey PRIMARY KEY (turn_info_gid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: posts fk1ybletfdtf368ypv1gqt9w5is; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk1ybletfdtf368ypv1gqt9w5is FOREIGN KEY (map_id) REFERENCES public.maps(map_id);


--
-- Name: maps fkbmuqfclq4y3ay7r4trlmx28ro; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.maps
    ADD CONSTRAINT fkbmuqfclq4y3ay7r4trlmx28ro FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

