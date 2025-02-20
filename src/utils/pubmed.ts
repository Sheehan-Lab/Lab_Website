interface PubMedArticle {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  pubDate: string;
  abstract?: string;
  doi?: string;
  pmid: string;
}

interface PubMedResponse {
  result: {
    [key: string]: {
      uid: string;
      title: string;
      authors: Array<{ name: string }>;
      source: string;
      pubdate: string;
      elocationid?: string;
    };
  };
}

async function fetchPubMedIds(searchTerm: string): Promise<string[]> {
  const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
  const searchUrl = `${baseUrl}/esearch.fcgi?db=pubmed&term=${encodeURIComponent(searchTerm)}&retmode=json&retmax=100`;
  
  const response = await fetch(searchUrl);
  const data = await response.json();
  return data.esearchresult.idlist;
}

async function fetchArticleDetails(ids: string[]): Promise<PubMedArticle[]> {
  const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils';
  const fetchUrl = `${baseUrl}/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`;
  
  const response = await fetch(fetchUrl);
  const data = await response.json() as PubMedResponse;
  
  return Object.values(data.result)
    .filter(article => article.uid)
    .map(article => ({
      id: article.uid,
      title: article.title,
      authors: article.authors?.map(author => author.name) || [],
      journal: article.source,
      pubDate: article.pubdate,
      doi: article.elocationid?.replace('doi: ', ''),
      pmid: article.uid,
    }));
}

export async function getSheehanPublications(): Promise<PubMedArticle[]> {
  // Search for publications by Vivien Sheehan, focusing on recent years
  const searchTerm = 'Sheehan Vivien[Author]';
  
  try {
    const ids = await fetchPubMedIds(searchTerm);
    const articles = await fetchArticleDetails(ids);
    
    // Sort by publication date, most recent first
    return articles.sort((a, b) => {
      const dateA = new Date(a.pubDate);
      const dateB = new Date(b.pubDate);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
}

export type { PubMedArticle }; 