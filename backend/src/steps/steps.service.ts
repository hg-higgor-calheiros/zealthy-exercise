import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateStepDto } from './dto/update-step.dto';
import { Step } from './entities/step.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStepDto } from './dto/create-step.dto';

const DEFAULT_STEPS = [
  {
    title: 'Second step',
    path: '/step-2',
    components: ['about_me'],
  },
  {
    title: 'Third step',
    path: '/step-3',
    components: ['birthday'],
  },
];

@Injectable()
export class StepsService implements OnModuleInit {
  constructor(
    @InjectRepository(Step)
    private stepsRepository: Repository<Step>,
  ) {}

  // Insert default record for the configuration
  // This is for initializing the default steps
  async onModuleInit() {
    const steps = await this.stepsRepository.find();
    if (steps.length === 0) {
      await Promise.all(
        DEFAULT_STEPS.map(
          async (step) => await this.stepsRepository.insert(step),
        ),
      );
    }
  }

  findAll() {
    return this.stepsRepository.find();
  }

  create(createStep: CreateStepDto) {
    return this.stepsRepository.insert(createStep);
  }

  update(id: number, updateStepDto: UpdateStepDto) {
    if (updateStepDto.components && updateStepDto.components.length === 0) {
      throw new Error('components cannot be empty');
    }

    return this.stepsRepository.update({ id }, updateStepDto);
  }

  async delete(id: number) {
    const step = await this.stepsRepository.findOne({ where: { id } });

    if (!step) throw new Error('step not found');

    return this.stepsRepository.delete({ id });
  }
}
