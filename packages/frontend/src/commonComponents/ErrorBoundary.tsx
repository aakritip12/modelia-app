import React, { Component, ReactNode } from 'react';
import ErrorIcon from '../assets/errorIcon.svg';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to show fallback UI
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log the error to an error monitoring service or console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = () => {
    // Reload the page (or perform any other action)
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <div className="bg-white shadow-xl rounded-lg p-8 w-full sm:w-96">
            <div className="flex flex-col items-center">
              {/* Error Icon */}
              <img
                className="h-16 w-16 text-red-600 mb-4"
                src={ErrorIcon}
                alt="Error Icon"
              />

              {/* Error Message */}
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Oops! Something went wrong.</h2>
              <p className="text-center text-gray-500 mb-6">
                Our Nostradamus are looking at the issue. Please try again later.
              </p>

              {/* Error Details */}
              <details className="text-xs text-gray-400 mb-4 w-full overflow-x-auto">
                <summary className="cursor-pointer">Error Details</summary>
                <pre>{this.state.error?.toString()}</pre>
                <pre>{this.state.errorInfo?.componentStack}</pre>
              </details>

              {/* Retry Button */}
              <button
                onClick={this.handleReload}
                className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-200"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export  {ErrorBoundary};
