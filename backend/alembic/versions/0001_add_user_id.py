"""add user_id to notes

Revision ID: 0001_add_user_id
Revises: 
Create Date: 2025-11-06 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001_add_user_id'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # Add user_id column (nullable)
    op.add_column('notes', sa.Column('user_id', sa.String(), nullable=True))


def downgrade():
    op.drop_column('notes', 'user_id')
