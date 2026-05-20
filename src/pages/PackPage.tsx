import React, { useMemo, useRef, useState } from 'react';
import BG_IMG from '../assets/images/bg-2.png';
import { BackgroundImage } from '../components/Background';
import {
  COR_DESTAQUE,
  COR_FUNDO_PRINCIPAL,
  COR_FUNDO_SECUNDARIO,
  COR_TEXTO_PRINCIPAL,
  FONTE_PRINCIPAL,
} from '../constants';
import { ytEmbed } from '../utils/youtubehelper';

type ProdutoKey = 'pack' | 'legendas';

type ProdutoConfig = {
  key: ProdutoKey;
  nome: string;
  subtitulo: string;
  youtubeEmbedUrl: string;
  precoDe: string;
  precoPor: string;
  economia: string;
  cta: string;
  checkoutUrl: string;
};

export const PackPage: React.FC = () => {
  const packIframeRef = useRef<HTMLIFrameElement | null>(null);
  const legendasIframeRef = useRef<HTMLIFrameElement | null>(null);

  const ytCommand = (iframe: HTMLIFrameElement | null, func: 'pauseVideo' | 'stopVideo') => {
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: 'command', func, args: [] }),
    '*'
  );
  };
  
  const produtos = useMemo<Record<ProdutoKey, ProdutoConfig>>(
    () => ({
      pack: {
        key: 'pack',
        nome: 'Ultimate Pack',
        subtitulo: 'TUDO que você precisa para EDITAR em um só lugar.',
        youtubeEmbedUrl: ytEmbed('SqiJ7ThNRTc'),
        precoDe: 'R$ 97,90',
        precoPor: 'R$ 47,90',
        economia: 'Você vai economizar R$ 50,00',
        cta: 'Ultimate Pack',
        checkoutUrl: 'https://pay.kiwify.com.br/lK0nMio',
      },
      legendas: {
        key: 'legendas',
        nome: 'Legendas Ultimate',
        subtitulo:
          'Tudo o que você precisa para deixar seus vídeos mais profissionais, dinâmicos e fáceis de assistir — sem After Effects e sem plugins.',
        youtubeEmbedUrl: ytEmbed('JDPwitUHOwU'), 
        precoDe: 'R$ 197,90',
        precoPor: 'R$ 97,90',
        economia: 'Você vai economizar R$ 100,00',
        cta: 'Legendas Ultimate',
        checkoutUrl: 'https://pay.kiwify.com.br/T4UbeyX',
      },
    }),
    []
  );

  const [produtoAtivo, setProdutoAtivo] = useState<ProdutoKey>('pack');

  const produto = produtos[produtoAtivo];
  const outroProdutoKey = produtoAtivo === 'pack' ? 'legendas' : 'pack';
  const outroProduto = produtos[outroProdutoKey];

  const handlePurchaseClick = () => {
    window.open(produto.checkoutUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleProduto = () => {
  if (produtoAtivo === 'pack') {
    ytCommand(packIframeRef.current, 'stopVideo');
  } else {
    ytCommand(legendasIframeRef.current, 'stopVideo');
  }
  setProdutoAtivo((prev) => (prev === 'pack' ? 'legendas' : 'pack'));
  };

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center pt-22 pb-16 z-10"
      style={{
        backgroundColor: COR_FUNDO_PRINCIPAL,
        color: COR_TEXTO_PRINCIPAL,
        fontFamily: FONTE_PRINCIPAL,
      }}
    >
      <BackgroundImage src={BG_IMG} opacity={0.25} />

      <style>{`
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        .animate-subtle-pulse {
          animation: subtlePulse 2s ease-in-out infinite;
        }
        
        .animate-fade-in {
            animation: fadeInScale 0.3s ease-out forwards;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col gap-10 items-center">

        {/* HEADER / TITULO / BOTÃO DE TROCA */}
        <div className="max-w-4xl md:py-12 flex flex-col items-center gap-6">

          <div className="relative group cursor-pointer select-none" onClick={toggleProduto}>
             <h1
              key={produto.key} 
              className="animate-fade-in max-w-full whitespace-nowrap text-[clamp(2rem,8vw,4rem)] sm:text-6xl font-extrabold mt-4 uppercase tracking-[-0.06em]"
              style={{
                color: COR_DESTAQUE,
                textShadow: `0 0 18px ${COR_DESTAQUE}44`,
              }}
            >
              {produto.nome}
            </h1>
          </div>

          <button
            onClick={toggleProduto}
            className="group relative flex flex-col items-center outline-none cursor-pointer"
            aria-label={`Trocar para ${outroProduto.nome}`}
          >
            <span
                className="mb-2 text-xs font-bold tracking-[0.2em] uppercase text-gray-400 group-hover:text-white transition-colors"
            >
                Clique para trocar
            </span>

            <div
                className="
                    relative flex items-center gap-3 px-6 py-3 rounded-full border border-opacity-30
                    bg-white/5 backdrop-blur-sm
                    transition-all duration-200
                    hover:bg-white/10 hover:border-opacity-70 hover:scale-105 hover:shadow-[0_0_15px_rgba(var(--destaque-rgb),0.2)]
                    active:scale-95 active:bg-white/15
                "
                style={{ borderColor: COR_DESTAQUE }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24"
                    viewBox="0 0 24 24" fill="none"
                    stroke={COR_DESTAQUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="animate-subtle-pulse" 
                >
                    <path d="M20 17H4M4 17L8 13M4 17L8 21" />
                    <path d="M4 7H20M20 7L16 3M20 7L16 11" />
                </svg>

                <span className="text-sm sm:text-base font-bold uppercase tracking-wider text-gray-200 group-hover:text-white">
                    Ver <span style={{ color: COR_DESTAQUE }}>{outroProduto.nome}</span>
                </span>
            </div>
          </button>

          <p className="mt-4 text-lg font-medium tracking-[-0.02em] sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
            {produto.subtitulo}
          </p>
        </div>

        {/* VÍDEO (FLIP) */}
        <div className="w-full max-w-3xl">
          <div
            className="relative"
            style={{
              perspective: '1200px',
            }}
          >
            <div
              className="relative w-full transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: produtoAtivo === 'pack' ? 'rotateY(0deg)' : 'rotateY(180deg)',
              }}
            >
              {/* FRONT (PACK) */}
              <div
                className="w-full rounded-lg overflow-hidden aspect-video bg-black shadow-2xl ring-1 ring-white/10"
                style={{
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <iframe
                  ref={packIframeRef}
                  className="w-full h-full"
                  src={produtos.pack.youtubeEmbedUrl}
                  title="Demonstração do Ultimate Pack"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* BACK (LEGENDAS) */}
              <div
                className="absolute inset-0 w-full rounded-lg overflow-hidden aspect-video bg-black shadow-2xl ring-1 ring-white/10"
                style={{
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <iframe
                  ref={legendasIframeRef}
                  className="w-full h-full"
                  src={produtos.legendas.youtubeEmbedUrl}
                  title="Demonstração do Legendas Ultimate"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CARD FLIP (PREÇOS) */}
        <div className="w-full max-w-md">
          <div
            className="relative"
            style={{
              perspective: '1200px',
            }}
          >
            <div
              className="relative w-full transition-transform duration-700"
              style={{
                transformStyle: 'preserve-3d',
                transform: produtoAtivo === 'pack' ? 'rotateY(0deg)' : 'rotateY(180deg)',
              }}
            >
              {/* FRONT CARD (PACK) */}
              <div
                className="w-full p-8 rounded-2xl shadow-2xl border border-white/5"
                style={{
                  backgroundColor: COR_FUNDO_SECUNDARIO,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <h3 className="text-xl sm:text-3xl font-semibold mb-2">
                  De{' '}
                  <span className="line-through text-gray-500 decoration-grey-500/50">
                    {produtos.pack.precoDe}
                    <br />
                  </span>{' '}
                  por apenas
                </h3>
                <h3 className="text-5xl font-black mb-2" style={{ color: COR_DESTAQUE }}>
                  {produtos.pack.precoPor}
                </h3>
                <p className="text-sm font-medium text-gray-400 mb-8 bg-black/20 inline-block px-3 py-1 rounded-full">{produtos.pack.economia}</p>

                <button
                  className="w-full py-4 cursor-pointer rounded-xl whitespace-nowrap text-xl sm:text-2xl font-black uppercase tracking-[-0.03em]
                             shadow-[0_0_20px_rgba(0,0,0,0.3)]
                             transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(var(--destaque-rgb),0.4)] active:scale-[0.98]"
                  style={{ backgroundColor: COR_DESTAQUE, color: COR_FUNDO_PRINCIPAL }}
                  onClick={() =>
                    window.open(produtos.pack.checkoutUrl, '_blank', 'noopener,noreferrer')
                  }
                >
                  {produtos.pack.cta}
                </button>

                <button
                  onClick={toggleProduto}
                  className="mt-6 w-full text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white transition py-2 cursor-pointer"
                >
                  Ver Legendas Ultimate →
                </button>
              </div>

              {/* BACK CARD (LEGENDAS) */}
              <div
                className="absolute inset-0 w-full p-8 rounded-2xl shadow-2xl border border-white/5"
                style={{
                  backgroundColor: COR_FUNDO_SECUNDARIO,
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <h3 className="text-xl sm:text-3xl font-semibold mb-2">
                  De{' '}
                  <span className="line-through text-gray-500 decoration-grey-500/50">
                    {produtos.legendas.precoDe}
                    <br />
                  </span>{' '}
                  por apenas
                </h3>
                <h3 className="text-5xl font-black mb-2" style={{ color: COR_DESTAQUE }}>
                  {produtos.legendas.precoPor}
                </h3>
                <p className="text-sm font-medium text-gray-400 mb-8 bg-black/20 inline-block px-3 py-1 rounded-full">{produtos.legendas.economia}</p>

                <button
                  className="w-full py-4 cursor-pointer rounded-xl whitespace-nowrap text-xl sm:text-2xl font-black uppercase tracking-[-0.03em]
                             shadow-[0_0_20px_rgba(0,0,0,0.3)]
                             transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(var(--destaque-rgb),0.4)] active:scale-[0.98]"
                  style={{ backgroundColor: COR_DESTAQUE, color: COR_FUNDO_PRINCIPAL }}
                  onClick={handlePurchaseClick}
                >
                  {produtos.legendas.cta}
                </button>

                <button
                  onClick={toggleProduto}
                  className="mt-6 w-full text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white transition py-2 cursor-pointer"
                >
                  ← Voltar para Ultimate Pack
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackPage;