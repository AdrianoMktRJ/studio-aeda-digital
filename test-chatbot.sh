#!/bin/bash

# Script de Teste do Assistente Virtual Studio AEDA
# Executa testes locais antes do deploy

echo "🤖 Testando Assistente Virtual Studio AEDA"
echo "=========================================="
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir sucesso
success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Função para imprimir erro
error() {
    echo -e "${RED}✗${NC} $1"
}

# Função para imprimir aviso
warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# 1. Verificar se dependências estão instaladas
echo "1. Verificando dependências..."
if [ -d "node_modules" ]; then
    success "node_modules encontrado"
else
    error "node_modules não encontrado"
    echo "   Execute: pnpm install"
    exit 1
fi

# 2. Verificar se arquivos do chatbot existem
echo ""
echo "2. Verificando arquivos do chatbot..."

files=(
    "client/src/components/ChatWidget.tsx"
    "server/chatbot-router.ts"
    "drizzle/schema.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        success "$file existe"
    else
        error "$file não encontrado"
        exit 1
    fi
done

# 3. Verificar se schema tem tabelas do chatbot
echo ""
echo "3. Verificando schema do banco..."

if grep -q "chatLeads" drizzle/schema.ts; then
    success "Tabela chatLeads encontrada"
else
    error "Tabela chatLeads não encontrada no schema"
    exit 1
fi

if grep -q "chatConversations" drizzle/schema.ts; then
    success "Tabela chatConversations encontrada"
else
    error "Tabela chatConversations não encontrada no schema"
    exit 1
fi

if grep -q "chatMessages" drizzle/schema.ts; then
    success "Tabela chatMessages encontrada"
else
    error "Tabela chatMessages não encontrada no schema"
    exit 1
fi

# 4. Verificar se ChatWidget está importado no App.tsx
echo ""
echo "4. Verificando integração no App.tsx..."

if grep -q "ChatWidget" client/src/App.tsx; then
    success "ChatWidget importado no App.tsx"
else
    error "ChatWidget NÃO está importado no App.tsx"
    exit 1
fi

# 5. Verificar se router do chatbot está registrado
echo ""
echo "5. Verificando router do chatbot..."

if grep -q "chatbotRouter" server/routers.ts; then
    success "chatbotRouter importado"
else
    error "chatbotRouter NÃO está importado"
    exit 1
fi

if grep -q "chatbot: chatbotRouter" server/routers.ts; then
    success "chatbotRouter registrado no appRouter"
else
    error "chatbotRouter NÃO está registrado"
    exit 1
fi

# 6. Testar build
echo ""
echo "6. Testando build..."
echo "   (Isso pode levar alguns segundos...)"

if pnpm build > /dev/null 2>&1; then
    success "Build passou sem erros"
else
    error "Build falhou"
    echo "   Execute: pnpm build"
    echo "   E verifique os erros"
    exit 1
fi

# 7. Verificar variáveis de ambiente necessárias
echo ""
echo "7. Verificando variáveis de ambiente..."

if [ -f ".env" ]; then
    success "Arquivo .env encontrado"
    
    if grep -q "DATABASE_URL" .env; then
        success "DATABASE_URL configurado"
    else
        warning "DATABASE_URL não encontrado no .env"
    fi
    
    if grep -q "BUILT_IN_FORGE_API_KEY" .env; then
        success "BUILT_IN_FORGE_API_KEY configurado"
    else
        warning "BUILT_IN_FORGE_API_KEY não encontrado"
    fi
else
    warning "Arquivo .env não encontrado"
    echo "   Variáveis de ambiente serão injetadas pela plataforma"
fi

# 8. Resumo
echo ""
echo "=========================================="
echo "✅ TODOS OS TESTES PASSARAM!"
echo "=========================================="
echo ""
echo "Próximos passos:"
echo "1. Fazer commit: git add -A && git commit -m 'feat: Add chatbot'"
echo "2. Fazer push: git push origin main"
echo "3. Deploy: vercel --prod"
echo ""
echo "Ou apenas aguardar deploy automático da Vercel!"
echo ""
