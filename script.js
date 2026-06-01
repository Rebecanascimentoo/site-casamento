// ================================
// FORMULÁRIO DE CONFIRMAÇÃO - APENAS 1 ACOMPANHANTE
// ================================

function confirmarPresenca() {
    const formSection = document.getElementById('secaoFormulario');
    const mensagemDiv = document.getElementById('mensagemConfirmacao');
    
    if (mensagemDiv.style.display === 'block') {
        mensagemDiv.style.display = 'none';
        mensagemDiv.style.opacity = '1';
    }
    
    if (formSection) {
        formSection.style.display = 'block';
        
        setTimeout(() => {
            formSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
        
        setTimeout(() => {
            const nomeInput = document.getElementById('nome');
            if (nomeInput) nomeInput.focus();
        }, 300);
    }
    
    if (mensagemDiv) {
        mensagemDiv.innerHTML = `
            ✨ Que alegria! Ficamos muito felizes com sua confirmação! 
            Preencha o formulário abaixo para nos ajudar a organizar tudo. 💕
        `;
        mensagemDiv.style.display = 'block';
        mensagemDiv.style.background = 'linear-gradient(135deg, #e8e2d4, #e0d8ca)';
        
        setTimeout(() => {
            mensagemDiv.style.opacity = '0';
            setTimeout(() => {
                mensagemDiv.style.display = 'none';
                mensagemDiv.style.opacity = '1';
            }, 400);
        }, 4000);
    }
}

function naoVou() {
    const mensagemDiv = document.getElementById('mensagemConfirmacao');
    const formSection = document.getElementById('secaoFormulario');
    
    if (formSection && formSection.style.display === 'block') {
        formSection.style.display = 'none';
    }
    
    if (mensagemDiv) {
        mensagemDiv.innerHTML = `
            🤍 Tudo bem, vamos sentir sua falta nesse dia especial. 
            Fique à vontade para acompanhar nossos momentos pelas redes sociais!
        `;
        mensagemDiv.style.display = 'block';
        mensagemDiv.style.background = 'linear-gradient(135deg, #e0d5c4, #d6cbb8)';
        
        setTimeout(() => {
            mensagemDiv.style.opacity = '0';
            setTimeout(() => {
                mensagemDiv.style.display = 'none';
                mensagemDiv.style.opacity = '1';
            }, 400);
        }, 4000);
    }
}

function fecharFormulario() {
    const formSection = document.getElementById('secaoFormulario');
    if (formSection) {
        formSection.style.display = 'none';
        
        const form = document.getElementById('formConfirmacao');
        if (form) form.reset();
        
        // Esconder campo de acompanhante
        const grupoNomeAcompanhante = document.getElementById('grupoNomeAcompanhante');
        if (grupoNomeAcompanhante) grupoNomeAcompanhante.style.display = 'none';
        
        const mensagemDiv = document.getElementById('mensagemConfirmacao');
        if (mensagemDiv) {
            mensagemDiv.innerHTML = `
                📝 Formulário fechado. Quando quiser confirmar, é só clicar em "Confirmar presença" novamente!
            `;
            mensagemDiv.style.display = 'block';
            mensagemDiv.style.background = 'linear-gradient(135deg, #e8e2d4, #e0d8ca)';
            
            setTimeout(() => {
                mensagemDiv.style.opacity = '0';
                setTimeout(() => {
                    mensagemDiv.style.display = 'none';
                    mensagemDiv.style.opacity = '1';
                }, 400);
            }, 3000);
        }
    }
}

// ================================
// GERENCIAR CAMPO DE ACOMPANHANTE
// ================================

function atualizarCampoAcompanhante() {
    const selectAcompanhante = document.getElementById('acompanhante');
    const valor = selectAcompanhante.value;
    const grupoNomeAcompanhante = document.getElementById('grupoNomeAcompanhante');
    const inputNomeAcompanhante = document.getElementById('nomeAcompanhante');
    
    if (valor === '1') {
        grupoNomeAcompanhante.style.display = 'block';
        if (inputNomeAcompanhante) {
            inputNomeAcompanhante.required = true;
            inputNomeAcompanhante.placeholder = "Nome completo do acompanhante";
        }
    } else {
        grupoNomeAcompanhante.style.display = 'none';
        if (inputNomeAcompanhante) {
            inputNomeAcompanhante.required = false;
            inputNomeAcompanhante.value = '';
        }
    }
}

// ================================
// MÁSCARA PARA TELEFONE
// ================================

function aplicarMascaraTelefone() {
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
            }
            e.target.value = value.substring(0, 16);
        });
    }
}

// ================================
// VALIDAÇÃO DO FORMULÁRIO
// ================================

function validarFormulario() {
    const form = document.getElementById('formConfirmacao');
    if (form) {
        form.addEventListener('submit', function(e) {
            const nomeInput = document.getElementById('nome');
            if (nomeInput && nomeInput.value.trim().length < 3) {
                e.preventDefault();
                alert('✨ Por favor, digite seu nome completo ✨');
                nomeInput.focus();
                return false;
            }
            
            const selectAcompanhante = document.getElementById('acompanhante');
            const tragaAcompanhante = selectAcompanhante.value;
            
            if (tragaAcompanhante === '1') {
                const nomeAcompanhante = document.getElementById('nomeAcompanhante');
                if (!nomeAcompanhante || nomeAcompanhante.value.trim().length < 3) {
                    e.preventDefault();
                    alert('✨ Por favor, digite o nome completo do seu acompanhante ✨');
                    if (nomeAcompanhante) nomeAcompanhante.focus();
                    return false;
                }
            }
            
            const mensagemDiv = document.getElementById('mensagemConfirmacao');
            if (mensagemDiv) {
                let mensagemAcompanhante = '';
                if (tragaAcompanhante === '0') {
                    mensagemAcompanhante = 'Você virá sozinho(a)!';
                } else {
                    mensagemAcompanhante = 'Você virá acompanhado(a)! Que legal!';
                }
                
                mensagemDiv.innerHTML = `
                    💕 Obrigado pela confirmação! ${mensagemAcompanhante}<br>
                    Entraremos em contato em breve. Aguardamos você com muito carinho! 💕
                `;
                mensagemDiv.style.display = 'block';
                mensagemDiv.style.background = 'linear-gradient(135deg, #d4e0c4, #c8d4b8)';
            }
            
            return true;
        });
    }
}

// ================================
// ANIMAÇÃO DE FOLHAS CAINDO
// ================================

function criarFolha() {
    const folha = document.createElement('div');
    folha.classList.add('folha-caindo');
    folha.innerHTML = '🍃​';
    folha.style.position = 'fixed';
    folha.style.top = '-20px';
    folha.style.left = Math.random() * 100 + 'vw';
    folha.style.fontSize = (Math.random() * 20 + 16) + 'px';
    folha.style.opacity = Math.random() * 0.6 + 0.2;
    folha.style.zIndex = '999';
    folha.style.pointerEvents = 'none';
    folha.style.animation = `cairFolha ${Math.random() * 3 + 4}s linear forwards`;
    
    const style = document.querySelector('#folhaAnimacaoStyle');
    if (!style) {
        const newStyle = document.createElement('style');
        newStyle.id = 'folhaAnimacaoStyle';
        newStyle.textContent = `
            @keyframes cairFolha {
                0% {
                    transform: translateY(-20px) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(newStyle);
    }
    
    document.body.appendChild(folha);
    
    setTimeout(() => {
        folha.remove();
    }, 7000);
}

// ================================
// INICIALIZAÇÃO
// ================================

document.addEventListener('DOMContentLoaded', function() {
    aplicarMascaraTelefone();
    validarFormulario();
    
    // Adicionar evento ao select de acompanhante
    const selectAcompanhante = document.getElementById('acompanhante');
    if (selectAcompanhante) {
        selectAcompanhante.addEventListener('change', atualizarCampoAcompanhante);
    }
    
    // Iniciar animação de folhas
    if (window.innerWidth > 768) {
        setInterval(criarFolha, 1200);
    } else {
        setInterval(criarFolha, 2500);
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ================================
// REDIMENSIONAMENTO RESPONSIVO
// ================================

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const formSection = document.getElementById('secaoFormulario');
        if (formSection && formSection.style.display === 'block') {
            formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 250);
});