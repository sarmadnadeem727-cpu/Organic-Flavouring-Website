import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';
import { officialInfo } from '../data/products';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] bg-[#FBF8F2] flex items-center justify-center p-6 text-center">
          <div className="max-w-md mx-auto space-y-6 bg-white p-8 rounded-2xl border-2 border-[#241D17] shadow-xl">
            <div className="w-14 h-14 bg-[#D9542F]/10 rounded-full flex items-center justify-center mx-auto text-[#D9542F]">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="font-serif-heading text-2xl font-bold text-[#241D17]">
                Something went wrong
              </h1>
              <p className="text-xs sm:text-sm text-[#5A4F46] leading-relaxed">
                An unexpected error occurred while loading this page. You can reload or contact our team directly on WhatsApp to place your spice order.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#241D17] hover:bg-[#3E352F] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Reload Page
              </button>
              <a
                href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20hit%20an%20error%20on%20your%20website`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
