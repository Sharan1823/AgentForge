import { Router } from 'express';
import { auth } from '../middleware/auth';
import { logger } from '../logger';
import { 
  parseNaturalLanguageToAgent, 
  suggestAgentTemplates, 
  getAgentTemplates,
  validateAgentDefinition,
  type AgentCreationRequest,
  type ParsedAgentDefinition 
} from '../services/agentCreationService';
import { AgentDefinitionSchema } from '@agentforge/shared';

const router = Router();

// POST /api/agent-creator/create — create agent from natural language
router.post('/create', auth, async (req, res) => {
  try {
    const { description, context } = req.body;
    const user = (req as any).user;

    if (!description || description.trim() === '') {
      return res.status(400).json({ 
        error: 'Description is required' 
      });
    }

    const request: AgentCreationRequest = {
      description: description.trim(),
      context: context || '',
      previousMessages: []
    };

    const agentDefinition = await parseNaturalLanguageToAgent(request);
    const validation = validateAgentDefinition(agentDefinition);

    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Invalid agent definition', 
        details: validation.errors 
      });
    }

    // Validate against schema
    const schemaValidation = AgentDefinitionSchema.safeParse(agentDefinition);
    if (!schemaValidation.success) {
      return res.status(400).json({ 
        error: 'Schema validation failed', 
        details: schemaValidation.error.issues 
      });
    }

    logger.info('agent_created_from_natural_language', { 
      userId: user.id, 
      agentName: agentDefinition.agentName,
      department: agentDefinition.department 
    });

    res.json({
      success: true,
      agentDefinition,
      message: `Agent "${agentDefinition.agentName}" created successfully`
    });

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logger.error('agent_creation_error', { 
      error: errMsg, 
      userId: (req as any).user?.id 
    });
    res.status(500).json({ 
      error: 'Failed to create agent' 
    });
  }
});

// POST /api/agent-creator/suggest — get agent template suggestions
router.post('/suggest', auth, async (req, res) => {
  try {
    const { query } = req.body;
    const queryInput = query;

    if (!queryInput || queryInput.trim() === '') {
      return res.status(400).json({ 
        error: 'Query is required' 
      });
    }

    const suggestions = await suggestAgentTemplates(queryInput.trim());

    logger.info('agent_suggestions_requested', { 
      userId: (req as any).user?.id, 
      query: queryInput.trim() 
    });

    res.json({
      success: true,
      suggestions: suggestions.sort((a, b) => (b.relevance || 0) - (a.relevance || 0))
    });

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logger.error('agent_suggestion_error', { 
      error: errMsg, 
      query: queryInput || 'unknown'
    });
    res.status(500).json({ 
      error: 'Failed to get suggestions' 
    });
  }
});

// GET /api/agent-creator/templates — get all available templates
router.get('/templates', auth, async (req, res) => {
  try {
    const templates = getAgentTemplates();

    logger.info('agent_templates_requested', { 
      userId: (req as any).user?.id 
    });

    res.json({
      success: true,
      templates
    });

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logger.error('agent_templates_error', { 
      error: errMsg 
    });
    res.status(500).json({ 
      error: 'Failed to get templates' 
    });
  }
});

// POST /api/agent-creator/validate — validate agent definition
router.post('/validate', auth, async (req, res) => {
  try {
    const agentDefinition = req.body;

    if (!agentDefinition) {
      return res.status(400).json({ 
        error: 'Agent definition is required' 
      });
    }

    const validation = validateAgentDefinition(agentDefinition);

    res.json({
      success: validation.isValid,
      validation
    });

  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logger.error('agent_validation_error', { 
      error: errMsg 
    });
    res.status(500).json({ 
      error: 'Failed to validate agent' 
    });
  }
});

export default router;
