import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[CampusShare ErrorBoundary] Caught exception:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900">
          <div className="max-w-md w-full rounded-3xl bg-white border border-slate-200 p-8 shadow-xl text-center space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
              <ShieldAlert className="h-7 w-7" />
            </div>
            <h1 className="text-xl font-black tracking-tight">Something Went Wrong</h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              An unexpected error occurred while rendering this page. Our team has been notified.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs shadow-md hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Return to Campus Home</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
