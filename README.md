# Projeto Streaming — versão 1.0

Protótipo de interface responsiva e instalável (PWA) para uma plataforma privada de streaming.

## O que já funciona
- Navegação entre Início, Filmes, Séries e Minha lista.
- Catálogo demonstrativo com filtros por tipo e gênero.
- Pesquisa por título, gênero e descrição.
- Modal de detalhes do título.
- Favoritos salvos localmente no dispositivo.
- Layout responsivo para celular, tablet e computador.
- Estrutura PWA com manifesto e service worker.

## Limites desta versão
Esta é a primeira camada visual e funcional do projeto. Os títulos são fictícios e servem apenas para demonstrar o catálogo. Ainda não há autenticação real, convites, painel administrativo conectado ao banco, vídeos nem player de reprodução. Os botões de perfil e reprodução informam que essas integrações serão feitas nas próximas etapas.

## Como testar
1. Extraia os arquivos.
2. Publique a pasta em um serviço de hospedagem estática com HTTPS (por exemplo, GitHub Pages ou Vercel).
3. Abra o endereço no navegador.
4. No iPhone, use Compartilhar > Adicionar à Tela de Início.
5. Em Android/desktop, use a opção de instalar aplicativo quando disponível.

Para testar localmente, rode um servidor HTTP na pasta (não abra o HTML diretamente como `file://`), por exemplo:
`python -m http.server 8000`

## Próximas etapas
1. Criar projeto Supabase e configurar autenticação.
2. Implementar convites individuais e permissões.
3. Criar tabelas de catálogo, perfis, histórico e favoritos.
4. Construir painel administrativo.
5. Integrar fornecedor de vídeo licenciado, URLs temporárias e DRM conforme contrato.
6. Implementar player compatível com os dispositivos-alvo.

## Segurança e licenciamento
Não inserir links de fontes não autorizadas. A plataforma deverá reproduzir somente conteúdos cujos direitos e condições de distribuição tenham sido contratados e confirmados. Não publicar chaves secretas no código do navegador.
